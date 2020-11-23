import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Checkbox from '../Checkbox/Checkbox';
import './HomescreenComponents.css';
import MenuSVG from '../../assets/menu.svg';

export default function DocumentCarousel({
  documents,
  selectMode,
  toggleSelectDocument,
  activateDocumentMenu,
}) {
  const Document = ({ documentId, documentName, dateModified, selected }) => {
    const updateDateModified = () => {
      Axios.patch(
        `https://central-rush-249500.firebaseio.com/user/documents/${documentId}.json`,
        {
          dateModified: new Date().toDateString(),
          timeModified: new Date().toLocaleTimeString(),
        }
      );
    };
    return (
      <div className='document' onClick={updateDateModified}>
        {selectMode ? (
          <div className='menu'>
            <Checkbox
              isChecked={selected}
              handleToggleCheck={() => toggleSelectDocument(documentId)}
            />
          </div>
        ) : (
          <img
            className='menu'
            alt='menu'
            src={MenuSVG}
            onClick={e => activateDocumentMenu(e.pageX, e.pageY)}
          />
        )}
        <Link
          to={`/workspace/${documentId}/all`}
          style={{ textDecoration: 'none' }}
        >
          <section className='css_document'>
            <div />
            <div />
            <div style={{ width: '70%' }} />
          </section>
          <div className='details'>
            <h4 className='title'>{documentName}</h4>
            <h6>{dateModified}</h6>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <section className='document_carousel'>
      {documents.map(d => (
        <Document
          key={d.id}
          documentId={d.id}
          documentName={d.name}
          dateModified={d.dateModified}
          selected={d.selected}
        />
      ))}
    </section>
  );
}

// Make sure to credit author of document png
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
