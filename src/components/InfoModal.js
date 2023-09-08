import React from "react";

import { Text, Title, Modal, createStyles, rem, Accordion } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

// CSS classes
const useStyles = createStyles((theme) => ({
  link: {
    left: '10.5rem',
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

const InfoModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { classes } = useStyles();

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="INFO"
        classNames={{
          content: classes.content,
          title: classes.title,
        }}
      >
        <Text 
          align="center" 
          weight={500} 
          size="xl" 
          mt="0.5rem"
          mb="1rem"
        >
          FREQUENTLY ASKED QUESTIONS
        </Text>
        <Accordion m="1rem" variant="contained" radius="md" defaultValue="overview">
          <Accordion.Item value="overview">
            <Accordion.Control>
              What is the Flowtime Technique and how does it work?
            </Accordion.Control>
            <Accordion.Panel>
            The Flowtime Technique is a productivity strategy adapted from the 
            Pomodoro Technique. Instead of working for a set 25-minute interval with a 
            5-minute break, the Flowtime Technique allows you to work until you naturally 
            start feeling tired or distracted. At that point, you take a break, 
            proportionate to the work period. The proportion is controllable in settings, 
            although the standard divisor is 5.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="pomodoro">
            <Accordion.Control>
              How does the Flowtime Technique combat the drawbacks of the Pomodoro Technique?
            </Accordion.Control>
            <Accordion.Panel>
              The Pomodoro Technique can sometimes hinder a person from entering a state 
              of deep work or “flow” due to the rigidity of the time intervals. On the other 
              hand, the Flowtime Technique promotes the flow state by letting you work until 
              you naturally start feeling tired or distracted, this adapts to your personal 
              work rhythm, allowing you to immerse yourself more fully into a task.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="benefits">
            <Accordion.Control>
              What are the primary benefits of the Flowtime Technique?
            </Accordion.Control>
            <Accordion.Panel>
            The Flowtime Technique has several benefits. Firstly, it allows for deep work 
            or flow states, which can increase your productivity and creativity. It also 
            easily allows you to track productivity and estimate how much time you need for 
            different tasks, aided by the statistics features. This data can be further 
            analyzed to identify peak focus times during the day or the best locations for 
            work. Lastly, it allows for personalization of your work rhythm and breaks, which 
            can provide a better balance and prevent burnout.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="more-info">
            <Accordion.Control>
              Where can I learn more about the Flowtime Technique?
            </Accordion.Control>
            <Accordion.Panel>
              This article provides an in-depth overview:
              https://zapier.com/blog/flowtime-technique/
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Modal>

      <Title 
        component="a" 
        href="#" 
        onClick={open} 
        order={4} 
        className={classes.link}
      >
        INFO
      </Title>
    </>
  );
}

export default InfoModal;