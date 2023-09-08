import React, { useEffect, useState } from "react";

import { Modal, Title, Text, Group, createStyles, rem } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

import { supabase } from "../supabaseClient";
import StatsVis from "./StatsVis";
import StatsTable from "./StatsTable";

const useStyles = createStyles((theme) => ({
  link: {
    left: '12rem !important',
    textDecoration: 'none',
    display: 'inline-block',
    // underline effect on hover
    position: 'relative',
    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      height: rem(2),
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[9],
      opacity: 0,
      transition: 'opacity 200ms ease',
    },
    '&:hover::after': {
      opacity: 1,
    },
  },
  content: {
    borderRadius: '12px',
  },
  title: {
    fontWeight: 600,
  },
}));

const StatsModal = ({ session }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [historyData, setHistoryData] = useState(null);
  const { classes } = useStyles();

  // get settings from database
  async function getSettings() {
    const { data, error } = await supabase
      .from('history')
      .select('created_at, working, length')
      .eq('user_id', session.user.id)

    if (error) {
      console.log(error);
    } else if (data) {
      console.log(data);
      // sort data by date, most recent first
      setHistoryData(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
    } else {
      console.log('no data');
    }
  }

  // update settings when session changes or modal opens 
  useEffect(() => {
    if (session) getSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, opened]);

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={close} 
        title="STATS" 
        classNames={{ 
          content: classes.content,
          title: classes.title, 
        }}
      >
        {historyData ?
          <Group>
            <StatsVis historyData={historyData} />
            <StatsTable historyData={historyData} />
          </Group> :
          <Text align="center" weight={500} size="xl" mt="0.5rem" mb="1rem">NO DATA</Text>
        }
      </Modal>

      <Title 
        component="a" 
        href="#" 
        onClick={open} 
        order={4} 
        className={classes.link}
      >
        STATS
      </Title>

    </>
    
  );
}

export default StatsModal;
