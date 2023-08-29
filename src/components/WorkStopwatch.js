import React from "react";

import { Button, Group, Title } from "@mantine/core";
import { useStopwatch } from "react-timer-hook";
import TimeDisplay from "./TimeDisplay";

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
      <Title order={2}>Stopwatch</Title>
      <TimeDisplay
        hours={hours} 
        minutes={minutes} 
        seconds={seconds} 
      />
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <Group position="center" spacing="xs">
        <Button variant="outline" onClick={start}>Start</Button>
        <Button variant="outline" onClick={pause}>Pause</Button>
        <Button variant="outline" onClick={() => { pause(); changeState(totalSeconds); }}>Stop</Button>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </Group>
    </div>
  );
};

export default WorkStopwatch;