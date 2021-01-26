import React, { useState } from 'react';
import styled from 'styled-components';
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

  const Container = styled.section`
    width: calc(100% - 40px);
    height: 70px;
    box-shadow: 0 5px 5px 0 rgba(154, 160, 185, 0.05),
      0 5px 30px 0 rgba(166, 173, 201, 0.22);
    border-radius: 30px;
    display: flex;
    padding: 0 20px;
    position: fixed;
    top: 20px;
    left: 20px;
    background-color: white;
    z-index: 1;
  `;

  const Controls = styled.div`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  `;

  return (
    <Container>
      <Controls>
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
      </Controls>
    </Container>
  );
}
