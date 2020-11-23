import React from 'react';
import { Link } from 'react-router-dom';

const Block = props => {
  const { item, saveContent, documentId, blockId } = props;

  return (
    <Link
      style={{ textDecoration: 'none' }}
      key={item.id}
      to={`/workspace/${documentId}/${item.id}`}
    >
      <li
        key={item.id}
        onClick={saveContent}
        style={
          item.id === blockId
            ? { backgroundColor: '#ccc', border: 'none' }
            : null
        }
      >
        {item.name}
      </li>
    </Link>
  );
};

export default Block;
