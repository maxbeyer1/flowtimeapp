import React, { useEffect, useState } from "react";

import { Modal, Table, Title, createStyles, rem } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

import { supabase } from "../supabaseClient";

const useStyles = createStyles((theme) => ({
  link: {
    marginLeft: '15rem !important',
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
  }, [session, opened]);

  // make timestamp more readable
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric', 
      month: '2-digit',
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    }).format(date);
  }
  
  // make duration more readable
  const formatDuration = (duration) => {
    let date = new Date(0);
    date.setSeconds(duration);
    return date.toISOString().substring(11, 19);
  }
  
  let historyRows;
  // if historyData is not null, map it to table rows
  if (historyData) {
    historyRows = historyData.map((row) => (
      <tr key={row.created_at}>
        <td>{formatTimestamp(row.created_at)}</td>
        {/* <td>{row.working.toString()}</td> */}
        <td>{formatDuration(row.length)}</td>
      </tr>
    ));
  } else {
    historyRows = null;
  }

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
        <Table>
          <thead>
            <tr>
              <th>DATE</th>
              {/* <th>WORKING</th> */}
              <th>LENGTH</th>
            </tr>
          </thead>
          <tbody>
            {historyRows}
          </tbody>
        </Table>
      </Modal>

      <Title 
        component="a" 
        href="#" 
        onClick={open} 
        order={4} 
        ml="2rem"
        className={classes.link}
      >
        STATS
      </Title>

    </>
    
  );
}

export default StatsModal;
