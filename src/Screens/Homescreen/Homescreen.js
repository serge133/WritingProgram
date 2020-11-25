import React, { useState, useEffect } from 'react';
import DocumentCarousel from '../../Components/Homescreen/DocumentCarousel';
import Topbar from '../../Components/Homescreen/Topbar';
import './Homescreen.css';
import Modal from '../../Components/Modal/Modal';
import uniqid from 'unique-string';
import Axios from 'axios';
import Popup from '../../Components/Popup/Popup';
import { Link } from 'react-router-dom';

const emptyAddingDocumentForm = {
  name: '',
};

export default function Homescreen() {
  const [isAdding, setIsAdding] = useState(false);
  const toggleNew = () => setIsAdding(prevState => !prevState);

  const [modal, setModal] = useState(null);

  const [addingDocumentForm, setAddingDocumentForm] = useState(
    emptyAddingDocumentForm
  );
  const [documents, setDocuments] = useState([]);

  const [selectMode, setSelectMode] = useState(false);
  const toggleSelectMode = () => setSelectMode(!selectMode);

  const [popup, setPopup] = useState({
    visible: false,
    position: { x: 0, y: 0 },
    documentId: '',
  });

  const [searchMode, setSearchMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const toggleSearchMode = () => setSearchMode(!searchMode);

  // * Fetch Documents
  useEffect(() => {
    try {
      const getDocuments = async () => {
        const response = await Axios.get(
          `https://central-rush-249500.firebaseio.com/user/documents.json`
        );
        if (response.data) {
          const iterableDocuments = Object.values(response.data);

          // Adds a select mode so that you can batch select documents
          iterableDocuments.forEach(doc => (doc.selected = false));
          setDocuments(iterableDocuments);
        }
      };
      getDocuments();
    } catch (e) {
      console.log(e);
    }
    document.title = 'Hello Michael';
  }, []);

  const addDocument = () => {
    const id = uniqid();
    const dateCreated = new Date().toDateString();
    // because you are creating a new document
    const dateModified = dateCreated;
    const timeModified = new Date().toLocaleTimeString();
    const document = {
      id: id,
      name: addingDocumentForm.name,
      dateCreated,
      dateModified,
      timeModified,
      // Top level is / and folders are /folder1/folder2/folder3
      origin: '/',
    };
    Axios.put(
      `https://central-rush-249500.firebaseio.com/user/documents/${id}.json`,
      document
    );
    setDocuments(documents.concat([document]));
    setAddingDocumentForm(emptyAddingDocumentForm);
    setModal(null);
  };

  const activateDocumentMenu = (x, y, documentId) => {
    setPopup({
      visible: true,
      position: { x, y },
      documentId,
    });
  };

  const toggleSelectDocument = documentId => {
    const docIndex = documents.findIndex(doc => doc.id === documentId);
    if (docIndex < 0) return;
    setDocuments(prevState => {
      const copyDocuments = [...prevState];
      const selectedDocument = copyDocuments[docIndex];
      selectedDocument.selected = !selectedDocument.selected;
      return copyDocuments;
    });
  };

  const deleteDocument = documentId => {
    Axios.delete(
      `https://central-rush-249500.firebaseio.com/user/documents/${popup.documentId}.json`
    );
    const deleteIndex = documents.findIndex(doc => doc.id === popup.documentId);
    if (deleteIndex < 0) return;
    const newDocuments = [...documents];
    newDocuments.splice(deleteIndex, 1);
    setDocuments(newDocuments);
    setPopup({ ...popup, visible: false });
  };

  const batch = {
    delete: () => {
      const documentsToDelete = documents.filter(doc => doc.selected);
      for (const i of documentsToDelete) {
        Axios.delete(
          `https://central-rush-249500.firebaseio.com/user/documents/${i.id}.json`
        );
      }
      setDocuments(prevState => prevState.filter(doc => !doc.selected));
      setSelectMode(false);
      // Axios.delete()
    },
    move: destination => {
      const documentsToMove = documents.filter(doc => doc.selected);
      console.log('moving: ', documentsToMove, ' to ', destination);
    },
  };

  const SearchedDocument = ({ documentId, documentName, dateModified }) => (
    <Link
      to={`/workspace/${documentId}/all`}
      style={{ textDecoration: 'none' }}
    >
      <div className='searched_document'>
        <h3>{documentName}</h3>
        <section className='details'>
          <h5 className='text'>{dateModified}</h5>
        </section>
      </div>
    </Link>
  );

  const renderModal = () => {
    const handleCloseModal = () => setModal(null);

    switch (modal) {
      case 'document':
        return (
          <Modal
            title='New Document'
            closeModalHandler={handleCloseModal}
            onSubmit={addDocument}
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
        );
      case 'folder':
        return (
          <Modal
            title='New Folder'
            onSubmit={() => console.log('adding folder')}
            closeModalHandler={handleCloseModal}
          ></Modal>
        );
      default:
        return;
    }
  };

  return (
    <div className='homescreen'>
      <Modal
        title='New Document'
        closeModalHandler={() => setModal(null)}
        display={modal === 'document'}
        onSubmit={addDocument}
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
        closeModalHandler={() => setModal(null)}
        display={modal === 'folder'}
      >
        <Modal
          title='New Else'
          closeModalHandler={() => setModal(null)}
          display={modal === 'else'}
        ></Modal>
      </Modal>
      {searchMode && (
        <Modal
          title='Search For A Document'
          closeModalHandler={toggleSearchMode}
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
      )}
      <Topbar
        handlePressNew={toggleNew}
        isAdding={isAdding}
        selectMode={selectMode}
        toggleSelectMode={toggleSelectMode}
        batch={batch}
        toggleSearchMode={toggleSearchMode}
        setModal={setModal}
      />
      {/* <h1>Recents</h1>
      <DocumentCarousel />
      <h1>Favorites</h1>
      <DocumentCarousel /> */}
      <h1 className='divider'>All Documents</h1>
      <DocumentCarousel
        documents={documents}
        selectMode={selectMode}
        toggleSelectDocument={toggleSelectDocument}
        activateDocumentMenu={activateDocumentMenu}
      />
      <Popup
        position={popup.position}
        visible={popup.visible}
        handleClosePopup={() => setPopup({ ...popup, visible: false })}
      >
        <button onClick={deleteDocument} className='delete_btn'>
          DELETE
        </button>
        <button>RENAME</button>
        <button>MOVE</button>
        <button>FAVORITE</button>
      </Popup>
      <h1 className='divider'>Folders</h1>
    </div>
  );
}

// export default Homescreen;
