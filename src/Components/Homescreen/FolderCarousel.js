import React from 'react';

export default function FolderCarousel({ folders }) {
  return (
    <section className='folder-carousel'>
      {folders.map(folder => (
        <div className='folder' key={folder.id}>
          <span className='folder-name'>{folder.name}</span>
        </div>
      ))}
    </section>
  );
}
