import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Checkbox from '../Checkbox';
import './HomescreenComponents.css';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import { colors } from '../../default-styles';

export default function DocumentCarousel({
  documents,
  selectMode,
  toggleSelectDocument,
  activateDocumentMenu,
  renameDocument,
}) {
  const Document = ({
    documentId,
    documentName,
    documentPreview,
    dateModified,
    selected,
    isRenaming,
  }) => {
    const updateDateModified = () => {
      Axios.patch(
        `https://central-rush-249500.firebaseio.com/user/documents/${documentId}.json`,
        {
          dateModified: new Date().toDateString(),
          timeModified: new Date().toLocaleTimeString(),
        }
      );
    };

    const Container = styled.div`
      display: inline-block;
      height: 250px;
      width: 200px;
      box-shadow: 0 5px 5px 0 rgba(154, 160, 185, 0.05),
        0 5px 30px 0 rgba(166, 173, 201, 0.22);
      border-radius: 5px;
      position: relative;
      margin-right: 20px;
      margin-bottom: 20px;
      cursor: pointer;
    `;

    const Details = styled.div`
      width: 100%;
      height: 100%;
      background-color: ${colors.blue3};
      border-radius: 10px;
      padding: 10px;
      overflow: hidden;
      color: ${colors.white};
      display: flex;
      flex-direction: column;
    `;

    const DocumentPreview = styled.section`
      flex: 1;
      overflow: hidden;
      border-radius: 10px;
      color: ${colors.blue3};
      background-color: ${colors.white};
    `;

    return (
      <Container onClick={updateDateModified}>
        {selectMode ? (
          <div className='menu'>
            <Checkbox
              isChecked={selected}
              handleToggleCheck={() => toggleSelectDocument(documentId)}
            />
          </div>
        ) : (
          <></>
        )}
        <Link
          to={`/workspace/${documentId}/all`}
          style={{ textDecoration: 'none' }}
        >
          {/* <section className='css_document'>
            <div />
            <div />
            <div style={{ width: '70%' }} />
          </section> */}
          {/* <DocumentPreview>{documentPreview}</DocumentPreview> */}
          <Details>
            <DocumentPreview>
              <ReactQuill
                value={documentPreview}
                readOnly
                modules={{ toolbar: false }}
              />
            </DocumentPreview>
            {isRenaming ? (
              <input
                defaultValue={documentName}
                onKeyUp={e => renameDocument(e)}
                autoFocus
              />
            ) : (
              <h4 className='title'>{documentName}</h4>
            )}
            <h6>{dateModified}</h6>
          </Details>
        </Link>
      </Container>
    );
  };

  const Container = styled.section`
    width: 100%;
  `;

  return (
    <Container>
      {documents.map(d => {
        let documentPreview = '';

        for (const i of Object.keys(d.blocks)) {
          documentPreview += d.blocks[i].content;
        }
        return (
          <Document
            key={d.id}
            documentId={d.id}
            documentName={d.name}
            documentPreview={documentPreview}
            dateModified={d.dateModified}
            selected={d.selected}
            isRenaming={d.isRenaming}
          />
        );
      })}
    </Container>
  );
}

// Make sure to credit author of document png
// <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
