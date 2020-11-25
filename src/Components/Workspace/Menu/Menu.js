import React, { useState } from 'react';
import './Menu.css';
import axios from 'axios';
import uniqid from 'unique-string';

// The sortables
import SortableBlocks from '../../../Containers/SortableBlocks';
import SortableNotes from '../../../Containers/SortableNotes';

const Menu = props => {
  const {
    workspace,
    setWorkspace,
    saveContent,
    documentId,
    blockId,
    setModal,
  } = props;

  // Three types of tabs: blocks, notes, and research
  const [tab, setTab] = useState('blocks');

  const saveBlockPosition = items => {
    const itemsObj = {};
    // For some reason react thinks i isn't being used
    // eslint-disable-next-line
    for (let i in items) {
      itemsObj[items[i].id] = { ...items[i], index: i };
    }
    axios.patch(
      `https://central-rush-249500.firebaseio.com/user/documents/${documentId}/blocks.json`,
      itemsObj
    );
    // setBlocks(items);
    setWorkspace({ ...workspace, blocks: items });
  };

  const saveNotePosition = items => {
    const itemsObj = {};
    // For some reason react thinks i isn't being used
    // eslint-disable-next-line
    for (let i in items) {
      itemsObj[items[i].id] = { ...items[i], index: i };
    }
    console.log(itemsObj);
    axios.patch(
      `https://central-rush-249500.firebaseio.com/workspace/notes.json`,
      itemsObj
    );
    // setNotes(items);
    setWorkspace({ ...workspace, notes: items });
  };

  // For the lists
  // ! useless now
  const addBlock = event => {
    if (event.key === 'Enter') {
      const val = event.target.value;
      const id = uniqid();
      setWorkspace({
        ...workspace,
        blocks: workspace.blocks.concat([{ id: id, name: val, content: '' }]),
      });
      setModal(null);
      axios.put(
        `https://central-rush-249500.firebaseio.com/workspace/blocks/${id}.json`,
        {
          id: id,
          index: workspace.blocks.length,
          name: val,
          content: '',
        }
      );
    }
  };

  const addNote = event => {
    if (event.key === 'Enter') {
      const val = event.target.value;
      const id = uniqid();
      setWorkspace({
        ...workspace,
        notes: workspace.blocks.concat([{ id: id, name: val, content: '' }]),
      });
      setModal(null);
      axios.put(
        `https://central-rush-249500.firebaseio.com/workspace/notes/${id}.json`,
        {
          id: id,
          index: workspace.notes.length,
          name: val,
          content: '',
        }
      );
    }
  };

  const renderTab = () => {
    switch (tab) {
      case 'blocks':
        return (
          <SortableBlocks
            items={workspace.blocks}
            setItems={saveBlockPosition}
            saveContent={saveContent}
            setAdd={() => setModal('block')}
            documentId={documentId}
            blockId={blockId}
            addItem={addBlock}
          />
        );
      case 'notes':
        return (
          <SortableNotes
            items={workspace.notes}
            setItems={saveNotePosition}
            // saveContent={saveContent}
            setAdd={() => setModal('note')}
            // tabID = {tabID}
            addItem={addNote}
          />
        );
      case 'research':
        return (
          <ul className='list'>
            <li>Test</li>
          </ul>
        );
      default:
        return <div>error unknown tab</div>;
    }
  };

  return (
    <div className='menu'>
      <section className='tabs'>
        <button
          className={tab === 'blocks' ? 'selected_tab' : 'tab'}
          onClick={() => setTab('blocks')}
        >
          BLOCKS
        </button>
        <button
          className={tab === 'notes' ? 'selected_tab' : 'tab'}
          onClick={() => setTab('notes')}
        >
          NOTES
        </button>
        <button
          className={tab === 'research' ? 'selected_tab' : 'tab'}
          onClick={() => setTab('research')}
        >
          RESEARCH
        </button>
      </section>
      <section className='content'>{renderTab()}</section>
    </div>
  );
};

export default Menu;
