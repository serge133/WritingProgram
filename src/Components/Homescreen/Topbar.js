import React, { useState } from 'react';
import './HomescreenComponents.css';

export default function Topbar({
  selectMode,
  toggleSelectMode,
  batch,
  setModal,
}) {
  // parent css class is '.homescreen'
  const [isAdding, setIsAdding] = useState(false);
  const handlePressNew = () => setIsAdding(prevState => !prevState);

  return (
    <section className='topbar'>
      <div className='controls'>
        <button onClick={toggleSelectMode}>
          {selectMode ? 'DESELECT' : 'SELECT'}
        </button>
        {selectMode ? (
          <button onClick={batch.delete}>REMOVE</button>
        ) : (
          <button onClick={() => setModal('search')}>SEARCH</button>
        )}
        <div
          onClick={handlePressNew}
          className={['new-button', isAdding && 'expand_new-button'].join(' ')}
        >
          {isAdding ? (
            <div className='hidden_buttons'>
              <button
                className='hidden_button'
                onClick={() => setModal('document')}
              >
                Document
              </button>
              <button
                className='hidden_button'
                onClick={() => setModal('folder')}
              >
                Folder
              </button>
            </div>
          ) : (
            'NEW'
          )}
        </div>
      </div>
      <section className='user'>Hello Michael</section>
    </section>
  );
}
