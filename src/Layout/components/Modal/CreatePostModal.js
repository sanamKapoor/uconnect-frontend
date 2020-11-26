import React from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';

import ModalHeader from './ModalHeader';
import CreatePostForm from '../Common/CreatePostForm';

function CreatePostModal({ show, onHide }) {
  
    const { userId } = useSelector(state => state.auth);

    return (
      <>
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="h6" id="contained-modal-title-vcenter">
            <ModalHeader />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePostForm userId={userId} parent="modal" />
        </Modal.Body>
      </Modal>
      </>
    );
  }
  
  
 export default CreatePostModal;