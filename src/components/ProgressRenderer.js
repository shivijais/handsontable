import React from 'react';

const ProgressRenderer = (instance, td, row, col, prop, value, cellProperties) => {
  const progress = Math.random().toFixed(2)*100;
  return (
    <div className="progress-wrapper">
      <div className="progress" style={{
        width: `${progress}%`
      }}>
        <div className="progress-value"></div>
      </div>
    </div>
  );
}

export default ProgressRenderer
