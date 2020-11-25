import React, { useEffect, useState } from 'react';
import './Modal.css';

const Modal = ({ title, closeModalHandler, onSubmit, children, display }) => {
  const [deattachElement, setDeattachElement] = useState(true);

  useEffect(() => {
    if (display) {
      setDeattachElement(false);
    } else {
      const timeout = setTimeout(() => setDeattachElement(true), 250);
      return () => clearTimeout(timeout);
    }
  }, [display]);

  return (
    <div
      className={['darken_screen', display ? 'fade-in' : 'fade-out'].join(' ')}
      style={{
        display: deattachElement ? 'none' : 'flex',
      }}
    >
      <div className='modal'>
        <section className='top_bar'>
          <h1>{title}</h1>
          <button onClick={closeModalHandler}>CLOSE</button>
        </section>
        <section className='content'>
          {children}
          {/* <Checkbox isChecked={isChecked} handleToggleCheck={toggleChecked} /> */}
        </section>
        {onSubmit && <button onClick={onSubmit}>SUBMIT</button>}
      </div>
    </div>
  );
};

export default Modal;
