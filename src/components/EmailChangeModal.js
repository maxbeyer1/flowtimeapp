import React from "react";

import { Modal, TextInput, ActionIcon, Button, Group, Text } from "@mantine/core";
import { useDisclosure, useInputState } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconEdit } from "@tabler/icons-react";

import { supabase } from '../supabaseClient'

const EmailChangeModal = () => {
  // Hooks for modal and form
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const [newEmail, setNewEmail] = useInputState('');

  return (
    <>
      <ActionIcon onClick={open} variant="transparent" color="dark" size="sm">
        <IconEdit />
      </ActionIcon>

      <Modal 
        opened={opened} 
        onClose={close}  
        radius="md"
        title="UPDATE EMAIL"
      >
        <form onSubmit={form.onSubmit((values) => {
          const { data, error } = supabase.auth.updateUser({ email: values.email });
          
          if (error) {
            alert(error.message);
          } else if (data) {
            console.log(data);
          }

          close();
        })}>
          <TextInput
            placeholder="example@example.com" 
            label="New Email"
            value={newEmail}
            onChange={setNewEmail}
            {...form.getInputProps('email')}
          />

          <Text pt={8} size="xs">
            You will need to verify your new email address.
          </Text>
          {/* Modal Buttons */}
          <Group position="right" mt="md">
            <Button 
              variant="default" 
              onClick={close}>
                Cancel
            </Button>
            <Button
              type="submit" 
              variant="outline"
            >
                Update email
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}

export default EmailChangeModal;