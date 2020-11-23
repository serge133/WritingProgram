import React from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
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
    setAdd,
    saveContent,
    documentId,
    blockId,
  } = props;

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
      setAdd(false);
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
      setAdd(false);
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

  return (
    <Tabs className='menu'>
      <TabList>
        <Tab onClick={() => setAdd(false)}>Blocks</Tab>
        <Tab onClick={() => setAdd(false)}>Notes</Tab>
        <Tab onClick={() => setAdd(false)}>Research</Tab>
      </TabList>

      {/* Blocks */}
      <TabPanel>
        <SortableBlocks
          items={workspace.blocks}
          setItems={saveBlockPosition}
          saveContent={saveContent}
          setAdd={setAdd}
          documentId={documentId}
          blockId={blockId}
          addItem={addBlock}
        />
      </TabPanel>

      {/* Notes */}
      <TabPanel>
        <SortableNotes
          items={workspace.notes}
          setItems={saveNotePosition}
          // saveContent={saveContent}
          setAdd={setAdd}
          // tabID = {tabID}
          addItem={addNote}
        />
      </TabPanel>

      {/* Research */}
      <TabPanel>
        <ul className='list'>
          <li>Test</li>
        </ul>
      </TabPanel>
    </Tabs>
  );
};

export default Menu;
