import React, { useState } from 'react';
import Checkbox from '../Checkbox/Checkbox';
import './Modal.css';

const Modal = ({ title, closeModalHandler, inputs, onSubmit, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const toggleChecked = () => setIsChecked(prevState => !prevState);

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
        <button onClick={onSubmit}>SUBMIT</button>
      </div>
    </div>
  );
};

export default Modal;
