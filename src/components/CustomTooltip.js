import React from "react";

import { Center, useMantineColorScheme } from "@mantine/core";

// component for custom tooltip on charts
const CustomTooltip = ({ active, payload, label }) => {
  const { colorScheme } = useMantineColorScheme();

  // styling for custom tooltip
  const tooltipStyles = {
    backgroundColor: colorScheme === "dark" ? "#161719" : "#ffffff",
    padding: "0.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
    height: "50px",
  };

  if (active && payload && payload.length) {
    return (
      <Center style={tooltipStyles}>
        <p>{`${label}: ${payload[0].value.toFixed(2)} hrs`}</p>
      </Center>
    );
  }
}

export default CustomTooltip;