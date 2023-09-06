import React from "react";

import { Text, Table, Flex } from "@mantine/core";

import { formatTimestamp } from "../utils/formatTimestamp";
import { formatDuration } from "../utils/formatDuration";

const StatsTable = ({ historyData }) => {
  let historyRows;
  // if historyData is not null, map it to table rows
  if (historyData) {
    historyRows = historyData.map((row) => (
      <tr key={row.created_at}>
        <td>{formatTimestamp(row.created_at)}</td>
        {/* <td>{row.working.toString()}</td> */}
        <td>{formatDuration(row.length)}</td>
      </tr>
    ));
  } else {
    historyRows = null;
  }

  return (
    <Flex direction="column" justify="center" align="center">
      <Text 
        align="center" 
        weight={500} 
        size="xl" 
        mt="1.5rem" 
        mb="0.25rem"
      >
        HISTORY
      </Text>
      <Table>
        <thead>
          <tr>
            <th>DATE</th>
            {/* <th>WORKING</th> */}
            <th>LENGTH</th>
          </tr>
        </thead>
        <tbody>
          {historyRows}
        </tbody>
      </Table>
    </Flex>
  )
}

export default StatsTable;