import React from "react";

import { Group, Button, Title } from "@mantine/core";
import { useTimer } from "react-timer-hook";
import TimeDisplay from "./TimeDisplay";

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
      <Title order={2}>Timer</Title>
      <TimeDisplay
        hours={hours} 
        minutes={minutes} 
        seconds={seconds} 
      />
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <Group position="center" spacing="xs">
        <Button variant="outline" onClick={resume}>Start</Button>
        <Button variant="outline" onClick={pause}>Pause</Button>
        <Button
          variant="outline" 
          onClick={() => {
            // Restarts to original timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + clock);
            restart(time)
          }}>
            Restart
        </Button>
      </Group>
    </div>
  );
};

export default BreakTimer;