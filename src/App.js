import React, { useEffect, useState } from "react";

import { Flex, Paper, Title, Box } from "@mantine/core";
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useColorScheme } from "@mantine/hooks";
import '@fontsource-variable/roboto-mono';

import WorkStopwatch from "./components/WorkStopwatch";
import BreakTimer from "./components/BreakTimer";
import SettingsModal from "./components/SettingsModal";

const App = () => {
  const [isWorking, setWorking] = useState(true);
  const [workingSeconds, setWorkingSeconds] = useState(0);
  const [breakDivisor, setBreakDivisor] = useState(5);

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
  const [colorScheme, setColorScheme] = useState(preferredColorScheme);
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === 'light' ? 'dark' : 'light');
    document.body.style.backgroundColor = colorScheme === 'light' ? '#1a1b1e' : '#f0f0f2';
  };

  // update color scheme when user changes system preference
  useEffect(() => {
    setColorScheme(preferredColorScheme);
  }, [preferredColorScheme]);

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
                '20px 20px 40px #d3d3d5, -20px -20px 40px #ffffff' :
                '20px 20px 40px #131415, -20px -20px 40px #1f2123',
            })}
          >
            {/* Header */}
            <Flex 
              justify="center" 
              align="center"
            >
              { isWorking
                ? <Title pos="absolute" order={2}>WORK</Title>
                : <Title pos="absolute" order={2}>BREAK</Title>
              }
              <SettingsModal updateSettings={setBreakDivisor} />
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
