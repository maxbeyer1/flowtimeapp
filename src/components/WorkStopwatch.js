import React from "react";
import { useStopwatch } from "react-timer-hook";

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
      <button onClick={pause}>Pause</button>
      <button onClick={() => { pause(); changeState(totalSeconds); }}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default WorkStopwatch;