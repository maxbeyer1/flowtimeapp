import React from "react";

const TimeDisplay = ({ hours, minutes, seconds }) => {
  return (
    <div style={{ fontSize: '100px' }}>
        <span>{hours.toString().padStart(2, '0')}</span>
          :<span>{minutes.toString().padStart(2, '0')}</span>
          :<span>{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
}

export default TimeDisplay