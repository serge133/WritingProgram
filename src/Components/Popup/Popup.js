import React from 'react';
import './Popup.css';

export default function Popup({
  position,
  visible,
  handleClosePopup,
  children,
}) {
  return (
    <div
      className='popup'
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        display: visible ? 'block' : 'none',
      }}
    >
      <button className='close_btn' onClick={handleClosePopup}>
        CLOSE
      </button>
      {children}
    </div>
  );
}
