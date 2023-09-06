import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";
import { Flex } from "@mantine/core";
import CustomTooltip from "./CustomTooltip";

const StatsChart = ({ data }) => {
  // fill in missing dates from the last 7 days
  const fillMissingDates = (data) => {
    const today = new Date();
    const lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
    const lastWeekDates = [];
    for (let i = lastWeek; i <= today; i.setDate(i.getDate() + 1)) {
      lastWeekDates.push(new Date(i).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    }

    const filledData = lastWeekDates.map((date) => {
      const found = data.find((item) => item.date === date);
      if (found) {
        return found;
      } else {
        return { date, totalLength: 0 };
      }
    });

    return filledData;
  }

  // shorten dates in data to day of week
  const shortenDates = (data) => {
    const shortenedData = data.map((item) => {
      const date = new Date(item.date);
      return { date: date.toLocaleDateString('en-US', { weekday: 'short' }), totalLength: item.totalLength };
    });

    return shortenedData;
  }

  // convert seconds to hours in data for chart
  const secondsToHoursDurations = (data) => {
    const formattedData = data.map((item) => {
      const hours = item.totalLength / 3600;
      return { date: item.date, totalLength: hours };
    });
    
    return formattedData;
  }

  const filledData = fillMissingDates(data);
  const shortenedData = shortenDates(filledData);
  const formattedData = secondsToHoursDurations(shortenedData);

  return (
    // <ResponsiveContainer width="100%" height="100%">
    <Flex justify="center">
      <BarChart width={300} height={150} data={formattedData}>
        <XAxis dataKey="date" />
        <Bar dataKey="totalLength" fill="#8884d8" />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
      </BarChart>
    </Flex>
    
    // </ResponsiveContainer>
    
  );
}

export default StatsChart;