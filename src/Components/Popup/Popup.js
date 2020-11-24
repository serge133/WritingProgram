import React from 'react';
import './Popup.css';

export default function Popup({
  position,
  visible,
  handleClosePopup,
  children,
}) {
  return (
    <section
      className='popup_screen-overlay'
      style={{
        display: visible ? 'block' : 'none',
      }}
      onClick={handleClosePopup}
    >
      <div
        className='popup'
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
        }}
      >
        {children}
      </div>
    </section>
  );
}
