import React from "react";

import { useStopwatch } from "react-timer-hook";
import { Button, Flex } from "@radix-ui/themes";

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
      <Flex justify="center" gap="3">
        <Button variant="outline" onClick={start}>Start</Button>
        <Button variant="outline" onClick={pause}>Pause</Button>
        <Button variant="outline" onClick={() => { pause(); changeState(totalSeconds); }}>Stop</Button>
        <Button variant="outline" onClick={reset}>Reset</Button>
      </Flex>
    </div>
  );
};

export default WorkStopwatch;