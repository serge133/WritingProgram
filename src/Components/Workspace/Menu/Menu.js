import React, { useState } from 'react';
import './Menu.css';
import axios from 'axios';

// The sortables
import SortableBlocks from '../../../Containers/SortableBlocks';
import SortableNotes from '../../../Containers/SortableNotes';

const Menu = props => {
  const { workspace, setWorkspace, saveContent, documentId, setModal } = props;

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

  // const saveNotePosition = items => {
  //   const itemsObj = {};
  //   // For some reason react thinks i isn't being used
  //   // eslint-disable-next-line
  //   for (let i in items) {
  //     itemsObj[items[i].id] = { ...items[i], index: i };
  //   }
  //   console.log(itemsObj);
  //   axios.patch(
  //     `https://central-rush-249500.firebaseio.com/workspace/notes.json`,
  //     itemsObj
  //   );
  //   // setNotes(items);
  //   setWorkspace({ ...workspace, notes: items });
  // };

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
            //// blockId={blockId}
            //// addItem={addBlock}
          />
        );
      case 'notes':
        return (
          <SortableNotes
            items={workspace.notes}
            setAdd={() => setModal('note')}
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
        <div
          className={tab === 'blocks' ? 'selected_tab' : 'tab'}
          onClick={() => setTab('blocks')}
        >
          BLOCKS
        </div>
        <div
          className={tab === 'notes' ? 'selected_tab' : 'tab'}
          onClick={() => setTab('notes')}
        >
          NOTES
        </div>
        <div
          className={tab === 'research' ? 'selected_tab' : 'tab'}
          onClick={() => setTab('research')}
        >
          RESEARCH
        </div>
      </section>
      <section className='content'>{renderTab()}</section>
    </div>
  );
};

export default Menu;
