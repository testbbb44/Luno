import React from 'react';

const CustomProgressBar = ({ value = 0, height = '8px', bgColor = '#e5e7eb', fillColor = '#10b981' }) => {
  const clampedValue = Math.max(0, Math.min(100, value)); // Ensure it's between 0 and 100

  return (
    <div
      style={{
        backgroundColor: bgColor,
        borderRadius: '9999px',
        overflow: 'hidden',
        height,
        width: '100%',
      }}>
      <div
        style={{
          width: `${clampedValue}%`,
          backgroundColor: fillColor,
          height: '100%',
          transition: 'width 0.3s ease-in-out',
          borderRadius:"20px"
        }}
      />
    </div>
  );
};

export default CustomProgressBar;
