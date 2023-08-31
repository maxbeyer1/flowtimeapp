import React from "react";

import { Group, ActionIcon } from "@mantine/core";
import { useTimer } from "react-timer-hook";
import { IconPlayerPause, IconPlayerPlay, IconPlayerStop, IconReload } from "@tabler/icons-react";

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
    <div style={{ textAlign: 'center' }}>
      <TimeDisplay
        hours={hours} 
        minutes={minutes} 
        seconds={seconds} 
      />
      <Group position="center" spacing="xs">
        { isRunning // play/pause buttons
          ? <ActionIcon color="dark" onClick={pause}> 
              <IconPlayerPause /> 
            </ActionIcon>
          : <ActionIcon color="dark" onClick={start}>
              <IconPlayerPlay />
          </ActionIcon>
        }

        <ActionIcon color="dark" onClick={() => { pause(); changeState(); }}>
          <IconPlayerStop />
        </ActionIcon>
        <ActionIcon
          color="dark"
          onClick={() => {
            // Restarts to original timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + clock);
            restart(time)
          }}>
            <IconReload />
        </ActionIcon>
      </Group>
    </div>
  );
};

export default BreakTimer;