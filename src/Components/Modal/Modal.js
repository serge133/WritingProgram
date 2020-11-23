import React from 'react';
import './Modal.css';

const Modal = ({ title, closeModalHandler, inputs, onSubmit, children }) => {
  return (
    <div className='darken_screen'>
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
