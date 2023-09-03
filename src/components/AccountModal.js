import React, { useState, useEffect } from "react";

import { Modal, Title, Button, createStyles, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { supabase } from "../supabaseClient";

const useStyles = createStyles((theme) => ({
  link: {
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
}));

const AccountModal = ({ session }) => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);

  const [email, setEmail] = useState(null);

  // get profile data
  useEffect(() => {
    async function getProfile() {
      const { user } = session;

      let { data, error } = await supabase
        .from('profiles')
        .select(`email`)
        .eq('id', user.id)
        .single();

      if (error) {
        console.warn(error);
      } else if (data) {
        setEmail(data.email);
      }
    }

    getProfile();
  }, [session]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="ACCOUNT">
        <div>
          <p>Email: {email}</p>
          <Button 
            onClick={() => { supabase.auth.signOut(); close(); }}
          >
            Sign Out
          </Button>
        </div>
      </Modal>

      <Title 
        component="a" 
        href="#" 
        onClick={open} 
        order={4} 
        ml="2rem"
        className={classes.link}
      >
        ACCOUNT
      </Title>
    </>
  );
}

export default AccountModal;