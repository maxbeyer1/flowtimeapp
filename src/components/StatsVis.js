import React from "react";

import { Flex, Title, Text } from "@mantine/core";

import StatsChart from "./StatsChart";

// TODO: new component name this is stupid
const StatsVis = ({ historyData }) => {
  const groupByDate = (data) => {
    // group by date with name of day
    const grouped = data.reduce((acc, item) => {
      const date = new Date(item.created_at).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(item);
      return acc;
    }, {});

    return grouped;
  }
  
  const calculateLengthPerDay = (groupedData) => {
    const lengthPerDay = Object.keys(groupedData).map((date) => {
      const totalLength = groupedData[date].reduce((acc, item) => {
        return acc + item.length;
      }, 0);
    
      return { date, totalLength };
    });

    return lengthPerDay;
  }

  const dailyData = calculateLengthPerDay(groupByDate(historyData));

  return (
    <Flex justify="center" align="center" direction="column">
      <Text size="xl" weight="500" mb="0.5rem">THIS WEEK</Text>
      <StatsChart data={dailyData} />
    </Flex>
  );
}

export default StatsVis;