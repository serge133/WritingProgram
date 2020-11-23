import React, { useState, useEffect } from 'react';
import './Workspace.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

import backSVG from '../../assets/back.svg';

import Menu from '../../Components/Workspace/Menu/Menu';

import Block from '../../Components/Workspace/Block/Block';
import Modal from '../../Components/Modal/Modal';
import uniqid from 'unique-string';

const emptyAddBlockForm = {
  name: '',
};

const App = ({ match }) => {
  const [workspace, setWorkspace] = useState({
    name: '',
    blocks: [],
    notes: [],
    research: [],
  });

  const [textEditor, setTextEditor] = useState('');

  const [saved, setSaved] = useState(true);

  const [add, setAdd] = useState(false);

  const [addBlockForm, setAddBlockForm] = useState(emptyAddBlockForm);

  const { documentId, blockId } = match.params;

  useEffect(() => {
    axios
      .get(
        `https://central-rush-249500.firebaseio.com/user/documents/${documentId}.json`
      )
      .then(response => {
        if (response.data) {
          const blocks = response.data.blocks
            ? Object.values(response.data.blocks)
            : [];
          const notes = response.data.notes
            ? Object.values(response.data.notes)
            : [];
          const research = response.data.research
            ? Object.values(response.data.research)
            : [];
          // Sorts blocks by index
          blocks.sort((a, b) => a.index - b.index);
          notes.sort((a, b) => a.index - b.index);
          research.sort((a, b) => a.index - b.index);
          setWorkspace({
            name: response.data.name,
            blocks: blocks,
            notes: notes,
            research: research,
          });
        }
      });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const block = workspace.blocks.find(block => block.id === blockId);
    if (block) setTextEditor(block.content);
  }, [blockId, workspace.blocks]);

  const saveContent = () => {
    const copyBlocks = [...workspace.blocks];
    const thisBlockIndex = copyBlocks.findIndex(block => block.id === blockId);
    if (thisBlockIndex >= 0) {
      copyBlocks[thisBlockIndex].content = textEditor;
      // setBlocks(copyBlocks);
      setWorkspace({ ...workspace, blocks: copyBlocks });
      setSaved(true);
      axios.patch(
        `https://central-rush-249500.firebaseio.com/user/documents/${documentId}/blocks/${blockId}.json`,
        {
          content: textEditor,
        }
      );
    }
  };

  const changeName = changedName => {
    const copyBlocks = [...workspace.blocks];
    const thisBlockIndex = copyBlocks.findIndex(block => block.id === blockId);
    if (thisBlockIndex >= 0) {
      copyBlocks[thisBlockIndex].name = changedName;
      // setBlocks(copyBlocks);
      setWorkspace({ ...workspace, blocks: copyBlocks });
      setSaved(true);
      axios.patch(
        `https://central-rush-249500.firebaseio.com/user/documents/${documentId}/blocks/${blockId}.json`,
        {
          name: changedName,
        }
      );
    }
  };

  const previewDocument = () => {
    // Block seperator in .join()
    const document = workspace.blocks.map(block => block.content).join('<br/>');
    // .join(`=========`);
    return (
      <ReactQuill
        readOnly={true}
        className='previewTextEditor'
        value={document}
      />
    );
  };

  const addBlock = () => {
    const id = uniqid();
    setWorkspace({
      ...workspace,
      blocks: workspace.blocks.concat([
        { id: id, name: addBlockForm.name, content: '' },
      ]),
    });
    setAdd(false);
    setAddBlockForm(emptyAddBlockForm);
    axios.put(
      `https://central-rush-249500.firebaseio.com/user/documents/${documentId}/blocks/${id}.json`,
      {
        id: id,
        index: workspace.blocks.length,
        name: addBlockForm.name,
        content: '',
      }
    );
  };

  const block = workspace.blocks.find(block => block.id === blockId);

  return (
    <div className='workspace'>
      <div className='topLeft'>
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <img src={backSVG} alt='Go Back' className='goHome' />
        </Link>
        <h1 className='documentName'>{workspace.name}</h1>
      </div>
      <Menu
        workspace={workspace}
        setWorkspace={setWorkspace}
        setAdd={setAdd}
        saveContent={saveContent}
        documentId={documentId}
        blockId={blockId}
      />
      {add && (
        <Modal
          title='New Block'
          closeModalHandler={() => setAdd(false)}
          onSubmit={addBlock}
        >
          <input
            value={addBlockForm.name}
            onChange={e =>
              setAddBlockForm({
                ...addBlockForm,
                name: e.target.value,
              })
            }
          />
        </Modal>
      )}
      {/* Bottom left of Grid */}
      <div className='menuConfigure'>
        <Link
          to={`/workspace/${documentId}/all`}
          style={{ textDecoration: 'none' }}
        >
          <button onClick={saveContent}>All</button>
        </Link>
      </div>
      {block ? (
        <Block
          block={block}
          saved={saved}
          workspace={workspace}
          setWorkspace={setWorkspace}
          setSaved={setSaved}
          textEditor={textEditor}
          setTextEditor={setTextEditor}
          saveContent={saveContent}
          onChangeName={changeName}
        />
      ) : (
        previewDocument()
      )}
    </div>
  );
};

export default App;
