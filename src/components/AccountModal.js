import React, { useState, useEffect } from "react";

import { Modal, Title, Button, TextInput, Group, Flex, createStyles, rem, Avatar, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from "@tabler/icons-react";

import { supabase } from "../supabaseClient";
import EmailChangeModal from "./EmailChangeModal";

const useStyles = createStyles((theme) => ({
  link: {
    left: '13.5rem',
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

// Modal for viewing and editing account information
const AccountModal = ({ session }) => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = session;

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={close} 
        title="ACCOUNT"
        classNames={{ 
          content: classes.content,
          title: classes.title, 
        }}
      >
        <div>
          <Flex pb={12} align="center">
            <Avatar radius="lg" size="md"/>
            <Title 
              pl={12} 
              order={3} 
              style={{ fontWeight: '500', fontSize: '1.25rem' }}
            >
              Flowtime User
            </Title>
          </Flex>
          <TextInput 
            disabled
            readOnly
            label="Email" 
            value={user.email}
            radius="md"
            variant="filled"
            pb={8} 
            rightSection={
              <EmailChangeModal />
            }
            rightSectionProps={{ style: { display: 'flex' } }} // fix for icon not showing
          />
          <TextInput 
            disabled
            readOnly
            label="Password" 
            value="********"
            type="password"
            radius="md"
            variant="filled"
            pb={8} 
            rightSection={
              <ActionIcon variant="transparent" color="dark" size="sm">
                <IconEdit />
              </ActionIcon>
            }
            rightSectionProps={{ style: { display: 'flex' } }} // fix for icon not showing
          />
          <Group position="center">
            <Button 
              onClick={() => { supabase.auth.signOut(); close(); }}
              mt={16}
              variant="outline"
              color="red"
            >
              Sign Out
            </Button>
          </Group>
        </div>
      </Modal>

      <Title 
        component="a" 
        href="#" 
        onClick={open} 
        order={4} 
        className={classes.link}
      >
        ACCOUNT
      </Title>
    </>
  );
}

export default AccountModal;