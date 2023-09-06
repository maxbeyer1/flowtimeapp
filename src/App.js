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

  async function getSettings() {
    const { data, error } = await supabase
      .from('profiles')
      .select('settings')
      .eq('id', session.user.id)

    if (error) {
      console.log(error);
    } else if (data[0].settings) {
      setBreakDivisor(data[0].settings[0].breakDivisor);
      setColorSchemeSetting(data[0].settings[0].colorScheme);
    } else {
      console.log('no data');
    }
  }

  if (session) getSettings();

  // hooks for color scheme
  // defaults to user's system preferred color scheme
  // or light mode if not supported
  // preferredColorScheme --> user's system preferred color scheme
  const preferredColorScheme = useColorScheme();
  // const [colorSchemeSetting, setColorSchemeSetting] = useLocalStorage({
  //   key: 'color-scheme', defaultValue: ''
  // });
  // colorSchemeSetting --> setting in Supabase
  const [colorSchemeSetting, setColorSchemeSetting] = useState('');
  // colorScheme --> current color scheme
  // if colorSchemeSetting is set, use that
  // otherwise, use preferredColorScheme
  const [colorScheme, setColorScheme] = useState(
    colorSchemeSetting ? colorSchemeSetting : preferredColorScheme
  );

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
    document.body.style.backgroundColor = colorScheme === 'light' ? '#f0f0f2' : '#1a1b1e';
  };

  // this seems unnecessary...
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
                updateDivisor={setBreakDivisor}
                divisor={breakDivisor}
                changeColorSetting={setColorSchemeSetting} 
                session={session}
              />
            </Flex>
            {/* Clock */}
            { isWorking
              ? <WorkStopwatch 
                  changeState={handleWorkingState} // pass function to child
                  session={session}
                /> 
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
