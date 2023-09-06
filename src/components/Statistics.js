import React from "react";

import { Title } from "@mantine/core";
import StatsChart from "./StatsChart";

const Statistics = ({ historyData }) => {
  const groupByDate = (data) => {
    // const grouped = data.reduce((acc, item) => {
    //   const date = item.created_at.split('T')[0];
    //   if (!acc[date]) {
    //     acc[date] = [];
    //   }

    //   acc[date].push(item);
    //   return acc;
    // }, {});
    
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
  
  console.log(groupByDate(historyData));

  const calculateLengthPerDay = (groupedData) => {
    const lengthPerDay = Object.keys(groupedData).map((date) => {
      const totalLength = groupedData[date].reduce((acc, item) => {
        return acc + item.length;
      }, 0);
    
      return { date, totalLength };
    });

    return lengthPerDay;
  }

  console.log(calculateLengthPerDay(groupByDate(historyData)));

  const dailyData = calculateLengthPerDay(groupByDate(historyData));

  return (
    <StatsChart data={dailyData} />
  );
}

export default Statistics;