import React, { useState, useEffect } from 'react';
import './Workspace.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import backSVG from '../../assets/back.svg';
import Menu from '../../Components/Workspace/Menu/Menu';

import Block from '../../Components/Workspace/Block/Block';
import Modal from '../../Components/Modal/Modal';
import uniqid from 'unique-string';

const emptyAddBlockForm = {
  name: '',
};

const autosaveTimeInSeconds = 3;

const App = ({ match }) => {
  const [workspace, setWorkspace] = useState({
    name: '',
    blocks: [],
    notes: [],
    research: [],
  });

  const [textEditor, setTextEditor] = useState('');

  const [saved, setSaved] = useState(true);
  const [autosaveTimer, setAutosaveTimer] = useState(autosaveTimeInSeconds);

  const [add, setAdd] = useState(false);

  const [addBlockForm, setAddBlockForm] = useState(emptyAddBlockForm);

  const { documentId, blockId } = match.params;

  const { name: workspace_name } = workspace;

  // Fetch document
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

  // Set the title of html to the document name
  useEffect(() => {
    document.title = workspace_name;
  }, [workspace_name]);

  // Render block on block id change
  useEffect(() => {
    const block = workspace.blocks.find(block => block.id === blockId);
    if (block) setTextEditor(block.content);
  }, [blockId, workspace.blocks]);

  // Save
  const saveContent = () => {
    const copyBlocks = [...workspace.blocks];
    const thisBlockIndex = copyBlocks.findIndex(block => block.id === blockId);
    if (thisBlockIndex >= 0) {
      copyBlocks[thisBlockIndex].content = textEditor;
      // setBlocks(copyBlocks);
      setWorkspace({ ...workspace, blocks: copyBlocks });
      setSaved(true);
      // ! this is problematic:
      // setAutosaveTimer(1);
      axios.patch(
        `https://central-rush-249500.firebaseio.com/user/documents/${documentId}/blocks/${blockId}.json`,
        {
          content: textEditor,
        }
      );
    }
  };
  // Autosave functionality
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (saved) return;
      setAutosaveTimer(prevState => prevState - 1);
    }, 1000);
    if (autosaveTimer <= 0) {
      clearTimeout(timeout);
      saveContent();
      setAutosaveTimer(autosaveTimeInSeconds);
    }
    return () => clearTimeout(timeout);
  }, [autosaveTimer, setAutosaveTimer, saved]);

  // Change Block Name
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

  // Render the whole document
  const previewDocument = () => {
    // Block seperator in .join()
    const document = workspace.blocks.map(block => block.content).join('<br/>');

    return (
      <ReactQuill
        style={{
          boxShadow: '0 5px 5px 0 rgba(154, 160, 185, 0.05)',
        }}
        readOnly={true}
        className='previewTextEditor'
        value={document}
      />
    );
  };

  // Creates a new block
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

  const truncatedName =
    workspace.name.length > 20
      ? workspace.name.slice(0, 20) + '...'
      : workspace.name;

  return (
    <div className='workspace'>
      <div className='topLeft'>
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <button>HOME</button>
        </Link>
        <h3 className='documentName'>{truncatedName}</h3>
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
            placeholder='Block Name'
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
          autosaveTimer={autosaveTimer}
          setAutosaveTimer={setAutosaveTimer}
        />
      ) : (
        previewDocument()
      )}
    </div>
  );
};

export default App;
