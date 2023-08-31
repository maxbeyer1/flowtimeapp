import React from "react";

import '@fontsource-variable/roboto-mono';

// Receives the hours, minutes and seconds from the parent component
// and displays them in a nice format
const TimeDisplay = ({ hours, minutes, seconds }) => {
  return (
    <div style={{
      fontSize: '100px', 
      fontFamily: 'Roboto Mono Variable', 
      fontWeight: '300',
      letterSpacing: '-0.05em',
    }}>
        <span>{hours.toString().padStart(2, '0')}</span>
          :<span>{minutes.toString().padStart(2, '0')}</span>
          :<span>{seconds.toString().padStart(2, '0')}</span>
    </div>
  );
}

export default TimeDisplay