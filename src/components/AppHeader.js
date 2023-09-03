import React from "react";

import { Flex, Title, createStyles, rem } from "@mantine/core";
import AuthModal from "./AuthModal";
import AccountModal from "./AccountModal";

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

const AppHeader = ({ session }) => {
  const { classes } = useStyles();

  return (
    <Flex justify="left" align="center">
      <Title order={3}>FLOWTIME</Title>
      <Title className={classes.link} component="a" href="#" order={4} ml="15rem">STATS</Title>
      {/* <Title className={classes.link} component="a" href="#" order={4} ml="2rem">ACCOUNT</Title> */}
      
      {!session ? <AuthModal /> : <AccountModal key={session.user.id} session={session} />}
    </Flex>
  );
}

export default AppHeader;