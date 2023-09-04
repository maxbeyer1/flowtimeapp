import React, { useEffect } from "react";

import { useDisclosure, useInputState } from '@mantine/hooks';
import { Modal, Button, NumberInput, Group, createStyles, ActionIcon, Switch, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { IconMoonStars, IconSettings, IconSun } from "@tabler/icons-react";
import { supabase } from "../supabaseClient";

// CSS classes
const useStyles = createStyles((theme) => ({
  content: {
    borderRadius: '12px',
  },
  title: {
    fontWeight: 600,
  },
  label: {
    fontWeight: 500,
    fontSize: '0.85rem',
  },
}));

const SettingsModal = ({ updateDivisor, divisor, changeColorSetting, session }) => {
  // States for modal and inputs
  const [opened, { open, close }] = useDisclosure(false);
  const [divisorValue, setDivisorValue] = useInputState(divisor);
  
  // Allows for current divisor to be input placeholder
  useEffect(() => {
    setDivisorValue(Number(divisor));
  }, [divisor]);

  // CSS classes
  const { classes } = useStyles();

  // Theme and color scheme hooks
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  async function updateSettings(divisor, scheme) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ settings: [{ breakDivisor: divisor, colorScheme: scheme }] })
      .eq('id', session.user.id)

    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  }

  return (
    <Group>
      <Modal 
        opened={opened} 
        onClose={close} 
        title="SETTINGS" 
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

        {/* Color Scheme Toggle */}
        <Switch
          label="Dark Mode"
          labelPosition="left"
          color={colorScheme === 'dark' ? 'gray' : 'dark'}
          onLabel={<IconSun size="1rem" stroke={2.5} color={theme.colors.yellow[4]} />}
          offLabel={<IconMoonStars size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
          size="md"
          radius="sm"
          classNames={{ label: classes.label }}
          checked={colorScheme === 'dark'}
          onChange={toggleColorScheme}
          pt={16}
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
            onClick={() => { 
              close(); 
              updateDivisor(divisorValue); 
              changeColorSetting(colorScheme);
              updateSettings(divisorValue, colorScheme);
          }}>
              Save changes
          </Button>
        </Group>
      </Modal>
      
      {/* Open Button */}
      <ActionIcon color="dark" ml="25em" variant="subtle" onClick={open}>
        <IconSettings size="1.5rem" />
      </ActionIcon> 
    </Group>
  );
};

export default SettingsModal;
