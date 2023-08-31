import React from "react";

import { useDisclosure, useInputState } from '@mantine/hooks';
import { Modal, Button, NumberInput, Group, createStyles, ActionIcon } from '@mantine/core';
import { IconSettings } from "@tabler/icons-react";

// CSS classes
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
    <Group>
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
        {/* Break Divisor Input */}
        <NumberInput
          value={divisorValue}
          onChange={setDivisorValue}
          placeholder="(default: 5)"
          label="Break Divisor"
          radius="md"
          hideControls
        />

        {/* Modal Buttons */}
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
      
      {/* Open Button */}
      <ActionIcon color="dark" ml="22em" variant="subtle" onClick={open}>
        <IconSettings size="1.5rem" />
      </ActionIcon> 
    </Group>
  );
};

export default SettingsModal;
