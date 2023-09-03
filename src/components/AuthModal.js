import React, { useState, useEffect } from "react";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Modal, Title, useMantineTheme, createStyles, rem } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { supabase } from '../supabaseClient';

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

const AuthModal = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  const [session, setSession] = useState(null)

  // subscribe to auth changes
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // close modal if user is authenticated
  useEffect(() => {
    if (session) {
      close();
    }
  }, [session])

  return (
    <>
      <Modal opened={opened} onClose={close} title="AUTHENTICATION">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme={theme.colorScheme === 'dark' ? 'dark' : 'light'}
        />
      </Modal>

      {/* <Button onClick={open}>Sign In</Button> */}
      <Title
        component="a" 
        href="#" 
        onClick={open} 
        order={4} 
        ml="2rem"
        className={classes.link}
      >
        SIGN IN
      </Title>
    </>
  );
}

export default AuthModal;
