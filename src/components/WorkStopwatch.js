import React from "react";

import { ActionIcon, Group } from "@mantine/core";
import { useStopwatch } from "react-timer-hook";
import { IconReload, IconPlayerPause, IconPlayerPlay, IconPlayerStop } from "@tabler/icons-react";

import TimeDisplay from "./TimeDisplay";
import { supabase } from "../supabaseClient";

const WorkStopwatch = ({ changeState, session }) => {
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

  async function recordHistory() {
    const { error } = await supabase
      .from('history')
      .insert({
        user_id: session.user.id, 
        created_at: new Date(), 
        length: totalSeconds,
        working: true, 
      })

    if (error) {
      console.log(error);
    } else {
      console.log('history updated');
    }
  }

  const endStopwatch = () => {
    pause();
    changeState(totalSeconds);
    recordHistory();
  }

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
        <ActionIcon color="dark" onClick={endStopwatch}>
          <IconPlayerStop />
        </ActionIcon>
        <ActionIcon color="dark" onClick={reset}>
          <IconReload />
        </ActionIcon>
      </Group>
    </div>
  );
};

export default WorkStopwatch;