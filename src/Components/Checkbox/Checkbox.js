import React from 'react';
import './Checkbox.css';

export default function Checkbox({ isChecked, handleToggleCheck }) {
  return (
    <div
      className={['checkbox', isChecked && 'checkbox_checked'].join(' ')}
      onClick={handleToggleCheck}
    >
      <div />
    </div>
  );
}
