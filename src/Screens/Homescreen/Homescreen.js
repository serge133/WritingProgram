import React, { useState, useEffect } from 'react';
import DocumentCarousel from '../../Components/Homescreen/DocumentCarousel';
import Topbar from '../../Components/Homescreen/Topbar';
import './Homescreen.css';
import Modal from '../../Components/Modal/Modal';
import uniqid from 'unique-string';
import Axios from 'axios';
import Popup from '../../Components/Popup/Popup';

const emptyAddingDocumentForm = {
  name: '',
};

export default function Homescreen() {
  const [isAddingDocument, setIsAddingDocument] = useState(false);
  const [addingDocumentForm, setAddingDocumentForm] = useState(
    emptyAddingDocumentForm
  );
  const [documents, setDocuments] = useState([]);

  const [selectMode, setSelectMode] = useState(false);
  const toggleSelectMode = () => setSelectMode(!selectMode);

  const [popup, setPopup] = useState({
    visible: false,
    position: { x: 0, y: 0 },
  });

  useEffect(() => {
    try {
      const getDocuments = async () => {
        const response = await Axios.get(
          `https://central-rush-249500.firebaseio.com/user/documents.json`
        );
        if (response.data) {
          const iterableDocuments = Object.values(response.data);
          setDocuments(iterableDocuments);
        }
      };
      getDocuments();
    } catch (e) {
      console.log(e);
    }
  }, []);

  const toggleAddingDocument = () =>
    setIsAddingDocument(prevState => !prevState);

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
    };
    Axios.put(
      `https://central-rush-249500.firebaseio.com/user/documents/${id}.json`,
      document
    );
    setDocuments(documents.concat([document]));
    setAddingDocumentForm(emptyAddingDocumentForm);
    toggleAddingDocument();
  };

  const activateDocumentMenu = (x, y) => {
    setPopup({
      visible: true,
      position: { x, y },
    });
  };

  return (
    <div className='homescreen'>
      {isAddingDocument && (
        <Modal
          title='New Document'
          closeModalHandler={toggleAddingDocument}
          // inputs={[
          //   {
          //     value: addingDocumentForm.name,
          //     onChange: e =>
          //       setAddingDocumentForm({
          //         ...addingDocumentForm,
          //         name: e.target.value,
          //       }),
          //   },
          // ]}
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
      )}
      <Topbar
        addDocument={toggleAddingDocument}
        selectMode={selectMode}
        toggleSelectMode={toggleSelectMode}
      />
      {/* <h1>Recents</h1>
      <DocumentCarousel />
      <h1>Favorites</h1>
      <DocumentCarousel /> */}
      <h1>All Documents</h1>
      <DocumentCarousel
        documents={documents}
        selectMode={selectMode}
        activateDocumentMenu={activateDocumentMenu}
      />
      <Popup
        position={popup.position}
        visible={popup.visible}
        handleClosePopup={() => setPopup({ ...popup, visible: false })}
      />
    </div>
  );
}

// export default Homescreen;
