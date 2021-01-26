import React, { useState, useEffect } from 'react';
import DocumentCarousel from '../../Components/Homescreen/DocumentCarousel';
import Topbar from '../../Components/Homescreen/Topbar';
import './Homescreen.css';
import Modal from '../../Components/Modal/Modal';
import uniqid from 'unique-string';
import Axios from 'axios';
import Popup from '../../Components/Popup/Popup';
import { Link } from 'react-router-dom';
import FolderCarousel from '../../Components/Homescreen/FolderCarousel';
import Origin from '../../Components/Homescreen/Origin';
import Menu from '../../Components/Menu';
import mountainJPG from '../../assets/mountain.jpg';
import styled from 'styled-components';
import { colors } from '../../default-styles';

const emptyAddingDocumentForm = {
  name: '',
};

const emptyNewFolderForm = {
  name: '',
  size: '',
  color: 'default',
  pinned: false,
};

export default function Homescreen() {
  // /home is the default origin
  const [origin, setOrigin] = useState('/');

  //// const [isAdding, setIsAdding] = useState(false);
  //// const toggleNew = () => setIsAdding(prevState => !prevState);

  const [modal, setModal] = useState(null);

  // Forms
  const [newDocumentForm, setNewDocumentForm] = useState(
    emptyAddingDocumentForm
  );

  const [newFolderForm, setNewFolderForm] = useState(emptyNewFolderForm);
  // ---

  // Essentials
  const [allDocuments, setAllDocuments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const [folders, setFolders] = useState([]);
  // ---
  const [selectMode, setSelectMode] = useState(false);
  const toggleSelectMode = () => setSelectMode(!selectMode);

  const [popup, setPopup] = useState({
    display: false,
    position: { x: 0, y: 0 },
    documentId: '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  // * Fetch Documents
  useEffect(() => {
    try {
      const getDocuments = async () => {
        const response = await Axios.get(
          `https://central-rush-249500.firebaseio.com/user/documents.json`
        );
        if (response.data) {
          const iterableDocuments = Object.values(response.data);
          // For the search
          setAllDocuments(iterableDocuments);
          const originDocuments = iterableDocuments.filter(
            doc => doc.origin === origin
          );

          originDocuments.forEach(doc => {
            // Adds a select mode so that you can batch select documents
            doc.selected = false;
            // So there is an input on the document when you want to rename it
            doc.isRenaming = false;
          });
          setDocuments(originDocuments);
        }
      };
      getDocuments();
    } catch (e) {
      console.log(e);
    }
    document.title = origin;
  }, [origin]);

  // * Fetch Folders
  useEffect(() => {
    try {
      const getFolders = async () => {
        const response = await Axios.get(
          `https://central-rush-249500.firebaseio.com/user/folders.json`
        );
        if (response.data) {
          const iterableFolders = Object.values(response.data);
          const originFolders = iterableFolders.filter(
            folder => folder.origin === origin
          );
          setAllFolders(iterableFolders);
          setFolders(originFolders);
        }
      };
      getFolders();
    } catch (e) {
      console.log(e);
    }
  }, [origin]);

  const newDocument = () => {
    const id = uniqid();
    const dateCreated = new Date().toDateString();
    // because you are creating a new document
    const dateModified = dateCreated;
    const timeModified = new Date().toLocaleTimeString();
    const document = {
      id: id,
      name: newDocumentForm.name,
      dateCreated,
      dateModified,
      timeModified,
      // Top level is / and folders are /folderid/foldeid2/folderid3
      origin: origin,
    };
    Axios.put(
      `https://central-rush-249500.firebaseio.com/user/documents/${id}.json`,
      document
    );
    setDocuments(documents.concat([document]));
    setNewDocumentForm(emptyAddingDocumentForm);
    setModal(null);
  };

  // * FOLDERS

  const newFolder = () => {
    const id = uniqid();

    const folder = {
      id,
      name: newFolderForm.name,
      // Will be small by default
      size: 'small',
      color: 'default',
      pinned: false,
      // There are folders within folders
      origin: origin,
    };

    Axios.put(
      `https://central-rush-249500.firebaseio.com/user/folders/${id}.json`,
      folder
    );
    setFolders(folders.concat([folder]));
    setNewFolderForm(emptyNewFolderForm);
    setModal(null);
  };

  const activateDocumentMenu = (x, y, documentId) => {
    setPopup({
      display: true,
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

  const toggleRenameDocument = () => {
    const docIndex = documents.findIndex(doc => doc.id === popup.documentId);
    if (docIndex < 0) return;
    setDocuments(prevState => {
      const copyDocuments = [...prevState];
      const selectedDocument = copyDocuments[docIndex];
      selectedDocument.isRenaming = !selectedDocument.isRenaming;
      return copyDocuments;
    });
  };

  const documentActions = {
    delete: documentId => {
      Axios.delete(
        `https://central-rush-249500.firebaseio.com/user/documents/${popup.documentId}.json`
      );
      const deleteIndex = documents.findIndex(
        doc => doc.id === popup.documentId
      );
      if (deleteIndex < 0) return;
      const newDocuments = [...documents];
      newDocuments.splice(deleteIndex, 1);
      setDocuments(newDocuments);
      // setPopup({ ...popup, display: false });
    },
    rename: e => {
      const name = e.target.value;

      if (e.keyCode === 27) {
        return toggleRenameDocument();
      }
      // If user pressed enter
      if (e.keyCode === 13) {
        Axios.patch(
          `https://central-rush-249500.firebaseio.com/user/documents/${popup.documentId}.json`,
          { name }
        );
        const renameIndex = documents.findIndex(
          doc => doc.id === popup.documentId
        );
        if (renameIndex < 0) return;
        const newDocuments = [...documents];
        newDocuments[renameIndex].name = name;
        setDocuments(newDocuments);
        toggleRenameDocument();
      }
    },
  };

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

  const batch = {
    delete: () => {
      const documentsToDelete = documents.filter(doc => doc.selected);
      // eslint-disable-next-line
      for (let doc of documentsToDelete) {
        Axios.delete(
          `https://central-rush-249500.firebaseio.com/user/documents/${doc.id}.json`
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

  const SearchedDocument = ({
    documentId,
    documentName,
    dateModified,
    documentOrigin,
  }) => (
    <Link
      to={`/workspace/${documentId}/all`}
      style={{ textDecoration: 'none' }}
    >
      <div className='searched-document'>
        <section>
          <h3 className='searched-document_name'>{documentName}</h3>
          <h6 className='searched-document_origin'>{documentOrigin}</h6>
        </section>

        <section className='details'>
          <h5 className='text'>{dateModified}</h5>
        </section>
      </div>
    </Link>
  );

  const closeModalHandler = () => setModal(null);

  const Container = styled.div`
    height: 100vh;
    width: 100vw;
  `;

  const BackgroundImage = styled.img`
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    min-width: 1000px;
  `;

  const Content = styled.div`
    padding: 20px;
    width: calc(100vw - 200px);
    height: 70vh;
    margin-top: 30vh;
    margin-left: 200px;
    background-color: ${colors.white};
    display: inline-block;
    position: relative;
  `;

  const ContentStatusBar = styled.section`
    position: absolute;
    width: 100%;
    height: 50px;
    top: -50px;
    left: 0px;
    background-color: ${colors.blue2 + 'DD'};
    backdrop-filter: blur(5px);
  `;

  return (
    <Container>
      {/* <Topbar
        selectMode={selectMode}
        toggleSelectMode={toggleSelectMode}
        batch={batch}
        setModal={setModal}
      /> */}
      <Menu allFolders={allFolders} />
      <BackgroundImage src={mountainJPG} alt='mountain' />
      <Content>
        <ContentStatusBar>
          {/* //// <Origin origin={origin} setOrigin={setOrigin} /> */}
        </ContentStatusBar>
        <DocumentCarousel
          documents={documents}
          selectMode={selectMode}
          toggleSelectDocument={toggleSelectDocument}
          activateDocumentMenu={activateDocumentMenu}
          renameDocument={documentActions.rename}
        />
        <FolderCarousel folders={folders} setOrigin={setOrigin} />
      </Content>
      {/* <h1 className='divider'>Folders</h1>

      
      <Popup
        position={popup.position}
        display={popup.display}
        handleClosePopup={() => setPopup({ ...popup, display: false })}
      >
        <button onClick={toggleRenameDocument}>RENAME</button>
        <button>MOVE</button>
        <button>FAVORITE</button>
        <button onClick={documentActions.delete} className='delete_btn'>
          DELETE
        </button>
      </Popup>
      <Modal
        title='New Document'
        closeModalHandler={closeModalHandler}
        display={modal === 'document'}
        onSubmit={newDocument}
      >
        <input
          value={newDocumentForm.name}
          placeholder='Document Name'
          onChange={e =>
            setNewDocumentForm({
              ...newDocumentForm,
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
        {allDocuments
          .filter(doc =>
            doc.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map(d => (
            <SearchedDocument
              key={d.id}
              documentId={d.id}
              documentName={d.name}
              dateModified={d.dateModified}
              documentOrigin={d.origin}
            />
          ))}
      </Modal> */}
    </Container>
  );
}

// export default Homescreen;
