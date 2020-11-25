import React from 'react';
import './HomescreenComponents.css';

export default function FolderCarousel({ folders, setOrigin }) {
  const changePath = folderName => {
    setOrigin(prevState => prevState + `/${folderName}`);
  };

  return (
    <section className='folder-carousel'>
      {folders.map(folder => (
        <div
          className='folder'
          key={folder.id}
          onClick={() => changePath(folder.name)}
        >
          <span className='folder-name'>{folder.name}</span>
        </div>
      ))}
    </section>
  );
}
