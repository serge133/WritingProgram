import React, { useState, useEffect } from 'react';
import DocumentCarousel from '../../Components/Homescreen/DocumentCarousel';
import Topbar from '../../Components/Homescreen/Topbar';
import './FolderScreen.css';
import Modal from '../../Components/Modal/Modal';
import uniqid from 'unique-string';
import Axios from 'axios';
import Popup from '../../Components/Popup/Popup';
import { Link } from 'react-router-dom';
import FolderCarousel from '../../Components/Homescreen/FolderCarousel';

const emptyAddingDocumentForm = {
  name: '',
};

const folderSizes = ['small', 'medium', 'large'];

const emptyNewFolderForm = {
  name: '',
  size: '',
  color: 'default',
  pinned: false,
};

export default function FolderScreen({ match }) {
  const folderIds = match;
  console.log(folderIds);

  // const [isAdding, setIsAdding] = useState(false);
  // const toggleNew = () => setIsAdding(prevState => !prevState);

  // const [modal, setModal] = useState(null);

  // // Forms
  // const [addingDocumentForm, setAddingDocumentForm] = useState(
  //   emptyAddingDocumentForm
  // );

  // const [newFolderForm, setNewFolderForm] = useState(emptyNewFolderForm);
  // // ---

  // // Essentials
  // const [documents, setDocuments] = useState([]);
  // const [folders, setFolders] = useState([]);
  // // ---
  // const [selectMode, setSelectMode] = useState(false);
  // const toggleSelectMode = () => setSelectMode(!selectMode);

  // const [popup, setPopup] = useState({
  //   display: false,
  //   position: { x: 0, y: 0 },
  //   documentId: '',
  // });

  // //// const [searchMode, setSearchMode] = useState(false);
  // const [searchQuery, setSearchQuery] = useState('');
  // //// const toggleSearchMode = () => setSearchMode(!searchMode);

  // // * Fetch Documents
  // useEffect(() => {
  //   try {
  //     const getDocuments = async () => {
  //       const response = await Axios.get(
  //         `https://central-rush-249500.firebaseio.com/user/documents.json`
  //       );
  //       if (response.data) {
  //         const iterableDocuments = Object.values(response.data);

  //         // Adds a select mode so that you can batch select documents
  //         iterableDocuments.forEach(doc => (doc.selected = false));
  //         setDocuments(iterableDocuments);
  //       }
  //     };
  //     getDocuments();
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   document.title = 'Hello Michael';
  // }, []);

  // // * Fetch Folders
  // useEffect(() => {
  //   try {
  //     const getFolders = async () => {
  //       const response = await Axios.get(
  //         `https://central-rush-249500.firebaseio.com/user/folders.json`
  //       );
  //       if (response.data) {
  //         const iterableFolders = Object.values(response.data);
  //         console.log(iterableFolders);
  //         setFolders(iterableFolders);
  //       }
  //     };
  //     getFolders();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, []);

  // const newDocument = () => {
  //   const id = uniqid();
  //   const dateCreated = new Date().toDateString();
  //   // because you are creating a new document
  //   const dateModified = dateCreated;
  //   const timeModified = new Date().toLocaleTimeString();
  //   const document = {
  //     id: id,
  //     name: addingDocumentForm.name,
  //     dateCreated,
  //     dateModified,
  //     timeModified,
  //     // Top level is / and folders are /folderid/foldeid2/folderid3
  //     origin: '/',
  //   };
  //   Axios.put(
  //     `https://central-rush-249500.firebaseio.com/user/documents/${id}.json`,
  //     document
  //   );
  //   setDocuments(documents.concat([document]));
  //   setAddingDocumentForm(emptyAddingDocumentForm);
  //   setModal(null);
  // };

  // // * FOLDERS

  // const newFolder = () => {
  //   const id = uniqid();

  //   const folder = {
  //     id,
  //     name: newFolderForm.name,
  //     // Will be small by default
  //     size: folderSizes[0],
  //     color: 'default',
  //     pinned: false,
  //     // There are folders within folders
  //     origin: '/',
  //   };

  //   Axios.put(
  //     `https://central-rush-249500.firebaseio.com/user/folders/${id}.json`,
  //     folder
  //   );
  //   setFolders(folders.concat([folder]));
  //   setNewFolderForm(emptyNewFolderForm);
  //   setModal(null);
  // };

  // const activateDocumentMenu = (x, y, documentId) => {
  //   setPopup({
  //     display: true,
  //     position: { x, y },
  //     documentId,
  //   });
  // };

  // const toggleSelectDocument = documentId => {
  //   const docIndex = documents.findIndex(doc => doc.id === documentId);
  //   if (docIndex < 0) return;
  //   setDocuments(prevState => {
  //     const copyDocuments = [...prevState];
  //     const selectedDocument = copyDocuments[docIndex];
  //     selectedDocument.selected = !selectedDocument.selected;
  //     return copyDocuments;
  //   });
  // };

  // const deleteDocument = documentId => {
  //   Axios.delete(
  //     `https://central-rush-249500.firebaseio.com/user/documents/${popup.documentId}.json`
  //   );
  //   const deleteIndex = documents.findIndex(doc => doc.id === popup.documentId);
  //   if (deleteIndex < 0) return;
  //   const newDocuments = [...documents];
  //   newDocuments.splice(deleteIndex, 1);
  //   setDocuments(newDocuments);
  //   setPopup({ ...popup, display: false });
  // };

  // const batch = {
  //   delete: () => {
  //     const documentsToDelete = documents.filter(doc => doc.selected);
  //     for (const i of documentsToDelete) {
  //       Axios.delete(
  //         `https://central-rush-249500.firebaseio.com/user/documents/${i.id}.json`
  //       );
  //     }
  //     setDocuments(prevState => prevState.filter(doc => !doc.selected));
  //     setSelectMode(false);
  //     // Axios.delete()
  //   },
  //   move: destination => {
  //     const documentsToMove = documents.filter(doc => doc.selected);
  //     console.log('moving: ', documentsToMove, ' to ', destination);
  //   },
  // };

  // const SearchedDocument = ({ documentId, documentName, dateModified }) => (
  //   <Link
  //     to={`/workspace/${documentId}/all`}
  //     style={{ textDecoration: 'none' }}
  //   >
  //     <div className='searched_document'>
  //       <h3>{documentName}</h3>
  //       <section className='details'>
  //         <h5 className='text'>{dateModified}</h5>
  //       </section>
  //     </div>
  //   </Link>
  // );

  // const closeModalHandler = () => setModal(null);

  return (
    <div className='homescreen'>
      {/* <Modal
        title='New Document'
        closeModalHandler={closeModalHandler}
        display={modal === 'document'}
        onSubmit={newDocument}
      >
        <input
          value={addingDocumentForm.name}
          placeholder='Document Name'
          onChange={e =>
            setAddingDocumentForm({
              ...addingDocumentForm,
              name: e.target.value,
            })
          }
        />
      </Modal>
      <Modal
        title='New Folder'
        closeModalHandler={closeModalHandler}
        display={modal === 'folder'}
        onSubmit={newFolder}
      >
        <input
          value={newFolderForm.name}
          placeholder='Folder Name'
          onChange={e =>
            setNewFolderForm({
              ...newFolderForm,
              name: e.target.value,
            })
          }
        />
      </Modal>
      <Modal
        title='New Else'
        closeModalHandler={closeModalHandler}
        display={modal === 'else'}
      ></Modal>
      <Modal
        title='Search For A Document'
        closeModalHandler={closeModalHandler}
        display={modal === 'search'}
      >
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder='Search Documents'
        ></input>
        {documents
          .filter(doc =>
            doc.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(d => (
            <SearchedDocument
              key={d.id}
              documentId={d.id}
              documentName={d.name}
              dateModified={d.dateModified}
            />
          ))}
      </Modal>
      <Topbar
        handlePressNew={toggleNew}
        isAdding={isAdding}
        selectMode={selectMode}
        toggleSelectMode={toggleSelectMode}
        batch={batch}
        setModal={setModal}
      />
      <h1 className='divider'>All Documents</h1>
      <DocumentCarousel
        documents={documents}
        selectMode={selectMode}
        toggleSelectDocument={toggleSelectDocument}
        activateDocumentMenu={activateDocumentMenu}
      />
      <h1 className='divider'>Folders</h1>

      <FolderCarousel folders={folders} />
      <Popup
        position={popup.position}
        display={popup.display}
        handleClosePopup={() => setPopup({ ...popup, display: false })}
      >
        <button>RENAME</button>
        <button>MOVE</button>
        <button>FAVORITE</button>
        <button onClick={deleteDocument} className='delete_btn'>
          DELETE
        </button>
      </Popup> */}
      Folder Screen !
    </div>
  );
}

// export default Homescreen;