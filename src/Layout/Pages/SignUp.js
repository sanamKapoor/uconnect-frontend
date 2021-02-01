import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ShowToast from '../components/Common/UIElements/ShowToast';
import InputElement from '../components/Common/UIElements/InputElement';
import ProfilePicUploader from '../components/Common/UIElements/ProfilePicUploader';
import ShowImage from '../components/Common/UIElements/ShowImage';

import defaultImage from '../../img/user.jpg';
import { backendReqModal, modalError, modalMsg, showSuccessToastFun } from '../../redux/actions/modalActions';

function SignUp() {

    const dispatch = useDispatch();
    const { modalErrorMsg, modalSuccessMsg, showSuccessToast } = useSelector(state => state.modal);

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(defaultImage);

    useEffect(() => {
        if(!image){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreview(fileReader.result)
        }
        fileReader.readAsDataURL(image);
    }, [image])

    useEffect(() => {
        dispatch(modalError(''))
        dispatch(modalMsg(''))
    }, [dispatch])

    useEffect(() => {
        if(modalSuccessMsg !== '' && modalErrorMsg === ''){
            setUserName('')
            setEmail('')
            setImage(null)
            setPassword('')
            setPreview(defaultImage)
        }
    }, [modalErrorMsg, modalSuccessMsg])

    useEffect(() => {
        const timer = setTimeout(() => {
            modalErrorMsg && dispatch(modalError(''))
            modalSuccessMsg && dispatch(modalMsg(''))
            !showSuccessToast && dispatch(showSuccessToastFun(true))
          }, 2000)
    
          return () => {
            clearTimeout(timer);
          }
    }, [dispatch, modalErrorMsg, modalSuccessMsg, showSuccessToast])

    const fileHandler = e => {
        if(e.target.files && e.target.files.length === 1){
            setImage(e.target.files[0]);
        } 
    }

    const submitHandler = e => {
        e.preventDefault();

        if(username.trim() === '' || email.trim() === '' || password.trim() === ''){
            dispatch(modalError('Please provide auth credentials'))
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        dispatch(backendReqModal('/auth/register', 'POST', formData, null))

    }

    return (
        <>
        { (modalSuccessMsg && showSuccessToast) && <ShowToast msg={modalSuccessMsg} /> } 
        <div className="auth-section">
        <section className="signup">
        <div className="row no-gutters m-3 shadow-lg">
            <div className="col-12 col-lg-5 bg-warning user-image py-3">
                <ShowImage src={preview} classes="rounded-circle" />
                <ProfilePicUploader 
                    fileHandler={fileHandler}
                    btnText="Upload Image"
                    btnClass="mt-3 btn btn-secondary btn-sm rounded-pill px-lg-4 py-lg-2 px-3 py-1"
                />
            </div>
            <div className="col-12 col-lg-7">
                <form onSubmit={submitHandler} className="form signup-form p-3 p-lg-4 p-xl-5 text-center bg-light">
                    <div className="pb-lg-3 pb-md-2 pb-1">
                        <div className="logo">
                            <h1>UConnect </h1>
                        </div>
                        <p className="text-muted mx-2 welcome-p">Share your enjoying moments with friends and family!</p>
                        <a href={`${process.env.REACT_APP_BACKEND_URL}/auth/google`} className="btn btn-light rounded-pill shadow"><i className="fab fa-google text-secondary mr-1 mr-sm-2"></i> Login with Google</a>
                    </div>
                    <div>
                        <InputElement 
                            inputType="text" 
                            inputName="name" 
                            classes="form-control my-2 my-md-3" 
                            inputText="👨  Username"
                            checkText={true} 
                            inputValue={username}
                            maxLength={20}
                            minLength={3}
                            onChangeHandler={e => setUserName(e.target.value)}
                        />
                        <InputElement 
                            inputType="email" 
                            inputName="email" 
                            inputText="📧 Email" 
                            classes="form-control my-2 my-md-3" 
                            inputValue={email}
                            onChangeHandler={e => setEmail(e.target.value)}
                        />
                        <InputElement 
                            inputType="password" 
                            inputName="password" 
                            inputText="🔒  Password" 
                            minLength={5}
                            maxLength={20}
                            classes="form-control my-2 my-md-3" 
                            inputValue={password}
                            onChangeHandler={e => setPassword(e.target.value)}
                        />
                        {
                            modalErrorMsg && 
                            <span className="text-danger text-center"> 
                                {modalErrorMsg}
                            </span>
                        }
                        <button type="submit" className="btn btn-block btn-secondary my-3 shadow">Sign Up</button>
                    </div>
                    <Link to="/login" className="text-secondary">Already have an account?</Link>
                </form>
            </div>
        </div>
    </section>
    </div>
    </>
    )
}

export default SignUp
