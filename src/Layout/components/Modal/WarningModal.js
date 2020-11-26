import React from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { backendReqModal } from '../../../redux/actions/modalActions';
import { fetchProfilePosts } from '../../../redux/actions/postActions';
import { logOutUser } from '../../../redux/actions/authActions'; 

function WarningModal(props) {

    const { show, onHide, msg, postId, element } = props;

    const dispatch = useDispatch();
    const { modalErrorMsg } = useSelector(state => state.modal)
    const { userId } = useSelector(state => state.auth);
    
    const deleteHandler = () => {
      switch(element){
        case 'post':
          dispatch(backendReqModal(`/post/${postId}/${userId}/delete`, 'DELETE'));
          dispatch(fetchProfilePosts(`/post/user/${userId}`))
          break;
        case 'about':
          dispatch(backendReqModal(`/user/about/${userId}`, 'DELETE'));
          break;
        case 'account':
          dispatch(backendReqModal(`/user/${userId}`, 'DELETE'));
          setTimeout(() => {
            dispatch(logOutUser())
          }, 2500)
          break;
        default:
          onHide()
      }
        if(!modalErrorMsg){
          onHide()
        }
    }

    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="text-center p-3 p-sm-4">
          <h5 className="text-muted warning-msg">{msg !== '' ? msg : 'Are you sure ?'}</h5>
            <div className="pt-1 pt-sm-2">
                <button className="btn btn-sm btn-danger m-1 m-sm-2" onClick={deleteHandler}>Yes</button>
                <button className="btn btn-sm btn-info m-1 m-sm-2" onClick={onHide}>No</button>
        </div>
        </Modal.Body>
      </Modal>
    );
  }
  
  
 export default WarningModal;