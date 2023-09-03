import React, { useEffect, useState } from "react";

import { Flex, Title, Box } from "@mantine/core";
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useColorScheme, useLocalStorage } from "@mantine/hooks";
import '@fontsource-variable/roboto-mono';

import WorkStopwatch from "./components/WorkStopwatch";
import BreakTimer from "./components/BreakTimer";
import SettingsModal from "./components/SettingsModal";
import AppHeader from "./components/AppHeader";

import { supabase } from './supabaseClient';

const App = () => {
  // hooks for timer
  const [isWorking, setWorking] = useState(true);
  const [workingSeconds, setWorkingSeconds] = useState(0);
  const [breakDivisor, setBreakDivisor] = useLocalStorage({key: 'break-divisor', defaultValue: 5});

  const handleWorkingState = ( workingSeconds ) => {
    setWorking(isWorking => !isWorking);
    setWorkingSeconds(workingSeconds);
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + (workingSeconds / breakDivisor)); // timer amount

  // hooks for color scheme
  // defaults to user's system preferred color scheme
  // or light mode if not supported
  const preferredColorScheme = useColorScheme();
  const [colorSchemeSetting, setColorSchemeSetting] = useLocalStorage({
    key: 'color-scheme', defaultValue: ''
  });
  
  const [colorScheme, setColorScheme] = useState(
    colorSchemeSetting ? colorSchemeSetting : preferredColorScheme
  );

  // const [colorScheme, setColorScheme] = useLocalStorage('color-scheme', preferredColorScheme);
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
    document.body.style.backgroundColor = colorScheme === 'light' ? '#f0f0f2' : '#1a1b1e';
  };

  useEffect(() => {
    if (colorSchemeSetting) setColorScheme(colorSchemeSetting);
  }, [colorSchemeSetting]);

  // update color scheme when user changes system preference
  useEffect(() => {
    if (!colorSchemeSetting) setColorScheme(preferredColorScheme);
  }, [preferredColorScheme]);

  // override default body background color for neumorphic design
  useEffect(() => {
    document.body.style.backgroundColor = colorScheme === 'light' ? '#f0f0f2' : '#1a1b1e';
  }, [colorScheme]);

  const [session, setSession] = useState(null)

  // subscribe to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider 
        withGlobalStyles 
        withNormalizeCSS
        theme={{
          colorScheme,
          fontFamily: 'Roboto Mono Variable', // need new font for headers
        }} 
      >
        <Flex justify="center" align="center" direction="column" style={{ height: '100%' }}>
          {/* <Paper 
            style={{
             backgroundColor: colorScheme === 'light' ? '#fafafa' : '#191a1c'
            }}  
            shadow="xl" 
            radius="lg" 
            p="xl"
          > */}
            
          {/* </Paper> */}

          {/* Header */}
          <Box sx={(theme) => ({
            position: 'absolute',
            top: '1rem',
            width: '32rem'
          })}>
            <AppHeader session={session} />
          </Box>
          <Box 
            sx={(theme) => ({
              backgroundColor: colorScheme === 'light' ? '#f0f0f2' : '#1a1b1e',
              outline: '0',
              display: 'block',
              boxSizing: 'border-box',
              borderRadius: theme.radius.lg,
              padding: '2rem',
              // neumorphic box shadow
              boxShadow: colorScheme === 'light' ? 
                '15px 15px 30px #d3d3d5, -15px -15px 30px #ffffff' :
                '15px 15px 30px #131415, -15px -15px 30px #1f2123',
            })}
          >
            <Flex 
              justify="center" 
              align="center"
            >
              { isWorking
                ? <Title pos="absolute" order={2}>WORK</Title>
                : <Title pos="absolute" order={2}>BREAK</Title>
              }
              <SettingsModal
                updateSettings={setBreakDivisor}
                divisor={breakDivisor}
                changeColorSetting={setColorSchemeSetting} 
              />
            </Flex>
            {/* Clock */}
            { isWorking
              ? <WorkStopwatch changeState={handleWorkingState} /> // pass function to child
              : <BreakTimer 
                  changeState={handleWorkingState} // pass function to chid
                  expiryTimestamp={time} 
                  clock={workingSeconds / breakDivisor} // timer amount
                /> 
            } 
          </Box>
        </Flex>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
