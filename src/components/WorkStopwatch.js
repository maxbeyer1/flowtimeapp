import React from "react";

import { ActionIcon, Group } from "@mantine/core";
import { useStopwatch } from "react-timer-hook";
import { IconArrowBackUp, IconPlayerPause, IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";

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
    <div style={{ textAlign: 'center',  }}>
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
        <ActionIcon color="dark" onClick={() => { pause(); changeState(totalSeconds); }}>
          <IconPlayerStop />
        </ActionIcon>
        <ActionIcon color="dark" onClick={reset}>
          <IconArrowBackUp />
        </ActionIcon>
      </Group>
    </div>
  );
};

export default WorkStopwatch;