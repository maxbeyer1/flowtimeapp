import React from "react";

import { useDisclosure, useInputState } from '@mantine/hooks';
import { Modal, Button, NumberInput, Group, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  content: {
    borderRadius: '12px',
  },
  title: {
    fontWeight: 600,
  },
}));

const SettingsModal = ({ updateSettings }) => {
  // States for modal and input
  const [opened, { open, close }] = useDisclosure(false);
  const [divisorValue, setDivisorValue] = useInputState(5);

  // CSS classes
  const { classes } = useStyles();

  return (
    <>
      <Modal 
        opened={opened} 
        onClose={close} 
        title="Settings" 
        classNames={{ 
          content: classes.content,
          title: classes.title, 
        }} 
        centered
      >
        <NumberInput
          value={divisorValue}
          onChange={setDivisorValue}
          placeholder="(default: 5)"
          label="Break Divisor"
          radius="md"
          hideControls
        />

        <Group position="right" mt="md">
          <Button 
            variant="default" 
            onClick={close}>
              Cancel
          </Button>
          <Button 
            variant="outline"
            onClick={() => { close(); updateSettings(divisorValue); }}>
              Save changes
          </Button>
        </Group>
      </Modal>

      <Button onClick={open}>Open modal</Button>
    </>
  );
};

export default SettingsModal;
