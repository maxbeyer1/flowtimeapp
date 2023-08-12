import React, { useState } from "react";
import { useTimer, useStopwatch } from "react-timer-hook"; 

const WorkStopwatch = ({ changeState }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  return (
    <div style={{textAlign: 'center'}}>
      <p>Stopwatch</p>
      <div style={{fontSize: '100px'}}>
        {/* Need a better solution than padStart (put time in its own component maybe) */}
        <span>{hours.toString().padStart(2, '0')}</span>
          :<span>{minutes.toString().padStart(2, '0')}</span>
          :<span>{seconds.toString().padStart(2, '0')}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={() => { pause(); changeState(totalSeconds); }}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

const BreakTimer = ({ changeState, expiryTimestamp }) => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => changeState() });

  return (
    <div style={{textAlign: 'center'}}>
      <p>Timer</p>
      <div style={{fontSize: '100px'}}>
        <span>{hours.toString().padStart(2, '0')}</span>
          :<span>{minutes.toString().padStart(2, '0')}</span>
          :<span>{seconds.toString().padStart(2, '0')}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={resume}>Resume</button>
      <button onClick={() => {
        // Restarts to 5 minutes timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + 5);
        restart(time)
      }}>Restart</button>
    </div>
  );
};

const App = () => {
  const [isWorking, setWorking] = useState(true);
  const [workingSeconds, setWorkingSeconds] = useState(0);
  const [breakDivisor, setBreakDivisor] = useState(5);

  const handleWorkingState = ( workingSeconds ) => {
    setWorking(isWorking => !isWorking);
    setWorkingSeconds(workingSeconds);
  }

  const time = new Date();
  time.setSeconds(time.getSeconds() + (workingSeconds / breakDivisor)); // 5 second timer

  return (
    <div>
      { isWorking 
        ? <WorkStopwatch changeState={handleWorkingState} /> 
        : <BreakTimer changeState={handleWorkingState} expiryTimestamp={time} /> }
    </div>
  );
};

export default App;
