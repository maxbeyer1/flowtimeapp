import React from "react";

// Receives the hours, minutes and seconds from the parent component
// and displays them in a nice format
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