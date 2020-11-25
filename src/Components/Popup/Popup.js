import React from 'react';
import Fade from '../Fade/Fade';
import './Popup.css';

export default function Popup({
  position,
  display,
  handleClosePopup,
  children,
}) {
  return (
    <Fade display={display}>
      <section className='popup-screen_overlay' onClick={handleClosePopup}>
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
    </Fade>
  );
}
