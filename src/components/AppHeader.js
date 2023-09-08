import React from "react";

import { Flex, Title } from "@mantine/core";
import AuthModal from "./AuthModal";
import AccountModal from "./AccountModal";
import StatsModal from "./StatsModal";
import InfoModal from "./InfoModal";

const AppHeader = ({ session }) => {
  return (
    <Flex justify="left" align="center" style={{ maxWidth: '32rem' }}>
      <Title order={3}>FLOWTIME</Title>
      <InfoModal />
      <StatsModal session={session} />      
      {!session ? <AuthModal /> : <AccountModal key={session.user.id} session={session} />}
    </Flex>
  );
}

export default AppHeader;