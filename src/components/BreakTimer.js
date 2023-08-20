import React from "react";
import { useTimer } from "react-timer-hook";

const BreakTimer = ({ changeState, expiryTimestamp, clock }) => {
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
      <button onClick={resume}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={() => {
        // Restarts to original timer
        const time = new Date();
        time.setSeconds(time.getSeconds() + clock);
        restart(time)
      }}>Restart</button>
    </div>
  );
};

export default BreakTimer;