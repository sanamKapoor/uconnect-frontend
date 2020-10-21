import React, { useState, useEffect, createRef } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { backendReqModal, modalError, showErrorToastFun } from '../../../redux/actions/modalActions';

import ModalHeader from './ModalHeader';
import Loading from '../Common/UIElements/Loading';
import InputElement from '../Common/UIElements/InputElement';

function UserAboutModal({ show, onHide, user }) {

  const inputRef = createRef();
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.user);
  const { modalErrorMsg, modalLoading, showErrorToast } = useSelector(state => state.modal);

  const [profession, setProfession] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [modalHeight, setModalHeight] = useState(0);

  useEffect(() => {
    const formEl = document.querySelector('form');
        if(formEl){
          setModalHeight(formEl.clientHeight)
        }
  }, [show])

    useEffect(() => {
        user.profession ? setProfession(user.profession) : setProfession('');
        user.location ? setLocation(user.location) : setLocation('');
        user.bio ? setBio(user.bio) : setBio('')

    }, [show, user.profession, user.bio, user.location])

    const submitHandler = e => {
        e.preventDefault();

         //  Do not show Error Toast
         showErrorToast && dispatch(showErrorToastFun(false));

        if(
            (user.profession && profession.trim() === '') ||
            (user.location && location.trim() === '') ||
            (user.bio && bio.trim() === '') 
          ){
          dispatch(modalError('You can not erase input like this.'))
          setBio(user.bio);
          setLocation(user.location);
          setProfession(user.profession);
          return;
        }

        if(
          user.profession === profession &&
          user.bio === bio &&
          user.location === location
        ) {
          return;
        }

        if(profession.trim() === '' && location.trim() === '' && bio.trim() === ''){
          return;
        }


        const formData = {
          profession: profession,
          location: location,
          bio: bio
        }

        dispatch(backendReqModal(`/user/about/${userId}`, 'PATCH', JSON.stringify(formData), { 'Content-Type': 'application/json' }))

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
            <div className="d-flex justify-content-center align-items-center" style={{height: `${modalHeight}px`}}><Loading /></div>      
            :
            <form className="form text-center" onSubmit={submitHandler}>
                    <InputElement 
                      inputType="text" 
                      inputName="profession" 
                      inputValue={profession}
                      inputRef={inputRef}
                      onChangeHandler={e => setProfession(e.target.value)}
                      classes="custom-input w-100 border-top-0 border-right-0 border-left-0 my-2" 
                      inputText="Profession"
                      checkText={true} 
                      maxLength="50"
                    />

                    <InputElement 
                      inputType="text" 
                      inputName="location" 
                      inputValue={location}
                      onChangeHandler={e => setLocation(e.target.value)}
                      classes="custom-input w-100 border-top-0 border-right-0 border-left-0 my-2" 
                      inputText="Location" 
                      checkText={true}
                      maxLength="50"
                    />

                    <textarea 
                      name="bio" 
                      rows="3" 
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      className="form-control my-2"
                      maxLength="100" 
                      placeholder="Bio...">
                    </textarea>
                    { 
                    (modalErrorMsg) && 
                        <span className="text-danger text-center my-2"> 
                            {modalErrorMsg}
                        </span>
                    }
                    <button type="submit" className="btn btn-outline-secondary btn-block mt-3">Edit Profile</button>
            </form>
          }
        </Modal.Body>
      </Modal>
    );
  }
  
  
 export default UserAboutModal;