import React, { useState } from "react";

import { Flex, Title } from "@mantine/core";

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

  return (
    <Flex justify="center" align="center" direction="column" style={{ height: '100%' }}>
      {/* Header */}
      <Flex justify="center" align="center">
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
    </Flex>
  );
};

export default App;
