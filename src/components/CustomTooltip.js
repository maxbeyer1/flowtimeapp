import React from "react";

import { Center } from "@mantine/core";

// styling for custom tooltip
const tooltipStyles = {
  backgroundColor: "white",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.25)",
  height: "50px",
};

// component for custom tooltip on charts
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Center style={tooltipStyles}>
        <p>{`${label}: ${payload[0].value}`}</p>
      </Center>
    );
  }

  return null;
}

export default CustomTooltip;