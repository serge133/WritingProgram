import React from 'react';
import trashSVG from '../../../assets/trash.svg';
import './Controller.css';
import axios from 'axios';

const BlockController = props => {
  const { expand: isExpanded, setWorkspace, workspace, block } = props;

  const deleteBlock = () => {
    if (window.confirm(`Are you sure you want to delete ${block.name}`)) {
      const copyBlocks = [...workspace.blocks];
      const deleteIndex = copyBlocks.findIndex(Block => Block.id === block.id);
      if (deleteIndex >= 0) {
        copyBlocks.splice(deleteIndex, 1);
        // setBlocks(copyBlocks);
        setWorkspace({ ...workspace, blocks: copyBlocks });
        axios.delete(
          `https://central-rush-249500.firebaseio.com/workspace/blocks/${block.id}.json`
        );
      }
    }
  };

  return (
    <div className={isExpanded ? 'expandController' : 'controller'}>
      <img
        src={trashSVG}
        alt='Delete Block'
        className='tool trash_btn'
        onClick={deleteBlock}
      />
    </div>
  );
};

export default BlockController;
