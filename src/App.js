import React, { useState } from "react";
import { useTimer, useStopwatch } from "react-timer-hook"; 

import WorkStopwatch from "./components/WorkStopwatch";
import BreakTimer from "./components/BreakTimer";

const App = () => {
  const [isWorking, setWorking] = useState(true);
  const [workingSeconds, setWorkingSeconds] = useState(0);
  const [breakDivisor, setBreakDivisor] = useState(1);

  const handleWorkingState = ( workingSeconds ) => {
    setWorking(isWorking => !isWorking);
    setWorkingSeconds(workingSeconds);
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + (workingSeconds / breakDivisor)); // timer amount

  return (
    <div>
      { isWorking 
        ? <WorkStopwatch changeState={handleWorkingState} /> // pass function to child
        : <BreakTimer 
            changeState={handleWorkingState} // pass function to chid
            expiryTimestamp={time} 
            clock={workingSeconds / breakDivisor} // timer amount
          /> 
      }
    </div>
  );
};

export default App;
