import React from "react";

import { Dialog, Button, Flex, Text, TextField } from "@radix-ui/themes";

const SettingsModal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">Settings</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Settings</Dialog.Title>
        <Dialog.Description size="2" mb="4" mt="-2">
          Make changes to your preferences.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Break Divisor
            </Text>
            <TextField.Input
              defaultValue="5"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default SettingsModal;
