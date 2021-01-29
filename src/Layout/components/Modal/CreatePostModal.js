import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

import ModalHeader from './ModalHeader';
import CreatePostForm from '../Common/CreatePostForm';
import { useEffect } from 'react';
import { showSuccessToastFun, showErrorToastFun } from '../../../redux/actions/modalActions';

function CreatePostModal({ show, onHide }) {
  
    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth);

    useEffect(() => {
      if(show){
        dispatch(showErrorToastFun(false))
        dispatch(showSuccessToastFun(true))
      } else {
        dispatch(showErrorToastFun(true))
        dispatch(showSuccessToastFun(false))
      }
    }, [show, dispatch])

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