import React from 'react';
import './HomescreenComponents.css';

export default function Topbar({
  addDocument,
  selectMode,
  toggleSelectMode,
  batch,
}) {
  // parent css class is '.homescreen'

  return (
    <section className='topbar'>
      <div className='controls'>
        <button onClick={addDocument}>NEW</button>
        <button onClick={toggleSelectMode}>
          {selectMode ? 'DESELECT' : 'SELECT'}
        </button>
        {selectMode && <button onClick={batch.delete}>REMOVE</button>}
      </div>
      <section className='user'>Hello Michael</section>
    </section>
  );
}
