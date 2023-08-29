import React, { useState } from "react";

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
    <div>
      <SettingsModal updateSettings={setBreakDivisor} />
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
    </div>
  );
};

export default App;
