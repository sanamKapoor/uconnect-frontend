import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import ModalHeader from './ModalHeader';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '../Common/UIElements/Loading';
import ImageUploader from '../Common/UIElements/ImageUploader';
import InputElement from '../Common/UIElements/InputElement';
import { backendReqModal, modalError, showErrorToastFun  } from '../../../redux/actions/modalActions';

function EditPostModal(props) {

    const { show, onHide, postId, userId } = props 

    const dispatch = useDispatch();
    const { modalErrorMsg, modalSuccessMsg, modalLoading, showErrorToast } = useSelector(state => state.modal)

    const [showCaption, setShowCaption] = useState(false);
    const [showFileInput, setShowFileInput] = useState(false);
    const [modalHeight, setModalHeight] = useState(0);

    const [caption, setCaption] = useState('');
    const [mediaFile, setMediaFile] = useState(null);

    useEffect(() => {
      const formEl = document.querySelector('.modal-body');
          if(formEl){
            setModalHeight(formEl.clientHeight)
          }
    }, [show])

    useEffect(() => {
        setShowCaption(false);
        setShowFileInput(false);
        setCaption('')
        setMediaFile(null) 

    }, [show])

    useEffect(() => {
      if(modalErrorMsg === '' && modalSuccessMsg !== ''){
          setCaption('')
          setMediaFile(null)
      }
    }, [modalErrorMsg, modalSuccessMsg])

    const captionHandler = () => {
      setShowCaption(true);
      setShowFileInput(false);
      setMediaFile(null);
      dispatch(modalError(''))
    }

    const showFileHandler = () => {
      setShowCaption(false);
      setShowFileInput(true);
      setCaption('');
      dispatch(modalError(''));
    }

    const fileHandler = e => {
      if(e.target.files && e.target.files.length === 1){
          setMediaFile(e.target.files[0])
      } 
    }

    const submitHandler = e => {
      e.preventDefault();
      showErrorToast && dispatch(showErrorToastFun(false));

      if(caption !== '') {
          dispatch(backendReqModal(`/post/${postId}/update-caption`, 'PATCH', 
          JSON.stringify({ creator: userId, caption: caption }), 
          { 'Content-Type': 'application/json' }, true, userId))
      }

      if(mediaFile !== null){
        const formData = new FormData();
        formData.append('mediaFile', mediaFile);
        formData.append('creator', userId);

        dispatch(backendReqModal(`/post/${postId}/update-media`, 'PATCH', formData, {}, true, userId))
      }

    
      if(modalSuccessMsg !== '' && modalErrorMsg === ''){
        setCaption('')
        setMediaFile(null)
      }
    }

    return (
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
          {
            modalLoading ? 
            <div 
              className="d-flex justify-content-center align-items-center" 
              style={{height: `${showFileInput ? modalHeight * 2 : modalHeight}px`}}>
            <Loading /></div>      
            :
        <form className="form p-1 p-sm-2 text-center" onSubmit={submitHandler}>
            <p className="text-left">What would you like to update ?</p>
            <div className="d-flex text-left">
              <div className="form-check w-100">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onChange={captionHandler} checked={showCaption === true} />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Caption
                </label>
              </div>
              <div className="form-check w-100">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onChange={showFileHandler} checked={showFileInput === true} />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Media
                </label>
              </div>
            </div>
              { 
              showCaption && 
                <InputElement  
                  inputName="caption"
                  inputText="Caption"
                  inputType="text"
                  inputValue={caption}
                  onChangeHandler={e => setCaption(e.target.value)}
                  classes="form-control my-2"
                  minLength="5"
                  maxLength="200"
                  checkText={true}
                />
              }
              { 
                showFileInput &&  
                <ImageUploader 
                  mediaFile={mediaFile}
                  fileHandler={fileHandler}
                 />
              }
              { 
              (modalErrorMsg) && 
                  <span className="text-danger text-center"> 
                      {modalErrorMsg}
                  </span>
              }
              { 
                (showFileInput || showCaption ) &&
                <button type="submit" className="btn btn-outline-secondary btn-block mt-2 mt-sm-3">Edit Post</button>
              }
        </form>
        }
        </Modal.Body>
      </Modal>
    );
  }
  
  
 export default EditPostModal;