import React, { useEffect, useState } from "react";

import { Modal, Table, Title, createStyles, rem } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';

import { supabase } from "../supabaseClient";
import { formatTimestamp } from "../utils/formatTimestamp";
import { formatDuration } from "../utils/formatDuration";
import Statistics from "./Statistics";

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
        <Statistics historyData={historyData} />
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
