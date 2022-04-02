import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import ModalHeader from './ModalHeader';
import Loading from '../Common/UIElements/Loading';
import ImageUploader from '../Common/UIElements/MediaUploader';
import InputElement from '../Common/UIElements/InputElement';

import { backendReqModal, modalError, showErrorToastFun  } from '../../../redux/actions/modalActions';

function EditPostModal(props) {

    const { show, onHide, postId } = props 

    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth);
    const { modalErrorMsg, modalSuccessMsg, modalLoading, showErrorToast } = useSelector(state => state.modal)

    const [showCaption, setShowCaption] = useState(false);
    const [showFileInput, setShowFileInput] = useState(false);
    const [modalHeight, setModalHeight] = useState(0);

    const [caption, setCaption] = useState('');
    const [mediaFile, setMediaFile] = useState(null);
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaId, setMediaId] = useState('');
    const [mediaName, setMediaName] = useState('');
    const [disable, setDisable] = useState(false);

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
          const file = e.target.files[0];

          if(file.type === "image/jpg" || file.type === "image/png" || file.type === "image/jpeg") {

          setDisable(true);
          const data = new FormData()
          data.append("file", file)
          data.append("upload_preset", process.env.REACT_APP_PRESET)
          data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME)

          fetch(`${process.env.REACT_APP_CLOUDINARY_URL}/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
              method:"post",
              body: data
          })
          .then(res => res.json())
          .then(data => {
              setMediaUrl(data.secure_url)
              setMediaId(data.public_id)
              setMediaName(file.name)
              setDisable(false);
              dispatch(modalError(''))
          })
          .catch(err=> {
              dispatch(modalError('Something went wrong'))
          })
       } 
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
        const formData = JSON.stringify({
          creator: userId,
          mediaFile: {
            mediaId: mediaId,
            fileName: mediaName,
            filePath: mediaUrl
          }
        })

        dispatch(backendReqModal(`/post/${postId}/update-media`, 'PATCH', formData, {
          'Content-Type': 'application/json'
        }, true, userId))
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
              className="d-flex flex-column justify-content-center align-items-center" 
              style={{height: `${showFileInput ? modalHeight * 2 : modalHeight}px`}}>
            <Loading />
            <span className="my-2">Please wait...</span>
            </div>      
            :
        <form className="form p-1 p-sm-2 text-center" onSubmit={submitHandler}>
            <p className="text-left">What would you like to update ?</p>
            <div className="d-flex text-left">
              <div className="form-check w-100">
                <input className="form-check-input pointer" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onChange={captionHandler} checked={showCaption === true} />
                <label className="form-check-label" htmlFor="exampleRadios1">
                  Caption
                </label>
              </div>
              <div className="form-check w-100">
                <input className="form-check-input pointer" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" onChange={showFileHandler} checked={showFileInput === true} />
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
                  disable={disable}
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
                <button type="submit" disabled={disable} className="btn btn-outline-secondary btn-block mt-2 mt-sm-3">
                  { (disable || modalLoading) ? 'Please wait...' : 'Edit Post'}
                </button>
              }
        </form>
        }
        </Modal.Body>
      </Modal>
    );
  }
  
  
 export default EditPostModal;