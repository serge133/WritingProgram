import React from 'react';
import Fade from '../Fade/Fade';
import './Modal.css';

const Modal = ({ title, closeModalHandler, onSubmit, children, display }) => {
  return (
    <Fade display={display} className='darken-screen'>
      {/* <div className='darken-screen'> */}
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
      {/* </div> */}
    </Fade>
  );
};

export default Modal;
