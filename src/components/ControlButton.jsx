// src/components/ControlButton.jsx
import React from 'react';

const ControlButton = ({ onClick, title, children }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        margin: '0 5px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
};

export default ControlButton;
