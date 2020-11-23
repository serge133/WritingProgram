import React, { Fragment, useState } from 'react';
import ReactQuill from 'react-quill';
import expandSVG from '../../../assets/expand.svg';
import minimizeSVG from '../../../assets/minimize.svg';
import './Block.css';

import BlockController from '../Controllers/BlockController';

const Block = ({
  block,
  workspace,
  setWorkspace,
  saved,
  setSaved,
  saveContent,
  textEditor,
  setTextEditor,
  onChangeName,
}) => {
  const [expand, setExpand] = useState(false);
  const [editNameMode, setEditNameMode] = useState(false);
  const [text, setText] = useState('');

  const toggleExpand = () => setExpand(!expand);
  const toggleEditNameMode = () => {
    setText(block.name);
    setEditNameMode(prevState => !prevState);
  };

  const changeName = event => {
    const newName = event.target.value;
    setText(newName);
  };

  const confirmChangeName = e => {
    // If the enter key was pressed
    if (e.keyCode === 13) {
      onChangeName(text);
      toggleEditNameMode();
    }
  };

  return (
    <Fragment>
      {/* The top */}
      <div className={expand ? 'expandDetails' : 'details'}>
        {editNameMode ? (
          <input
            type='text'
            name='name'
            className='edit_name-input'
            value={text}
            autoFocus
            onBlur={toggleEditNameMode}
            onKeyUp={e => confirmChangeName(e)}
            onChange={e => changeName(e)}
          />
        ) : (
          <h2 className='documentSubName' onClick={toggleEditNameMode}>
            {block ? block.name : null}
          </h2>
        )}
        <img
          onClick={toggleExpand}
          src={expand ? minimizeSVG : expandSVG}
          alt='Expand Screen'
          className='expandBtn'
        />
        {saved ? (
          <h3 className='saved'>saved</h3>
        ) : (
          <button onClick={saveContent} className='saveContentButton'>
            Save
          </button>
        )}
      </div>
      {/* The middle */}
      <ReactQuill
        className={expand ? 'expandTextEditor' : 'textEditor'}
        value={textEditor}
        onChange={content => setTextEditor(content)}
        onKeyUp={() => setSaved(false)}
      />
      {/* The bottom */}
      <BlockController
        expand={expand}
        block={block}
        workspace={workspace}
        setWorkspace={setWorkspace}
      />
    </Fragment>
  );
};

export default Block;
