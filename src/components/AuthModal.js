import React from "react";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button, Modal, useMantineTheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { supabase } from '../supabaseClient';

const AuthModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme={theme.colorScheme === 'dark' ? 'dark' : 'light'}
        />
      </Modal>

      <Button onClick={open}>Sign In</Button>
    </>
  );
}

export default AuthModal;
