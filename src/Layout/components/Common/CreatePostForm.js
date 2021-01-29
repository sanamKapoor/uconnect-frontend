import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { backendReqModal, showErrorToastFun, showSuccessToastFun } from '../../../redux/actions/modalActions';

import ImageUploader from './UIElements/MediaUploader';
import Loading from './UIElements/Loading';
import InputElement from './UIElements/InputElement';

function CreatePostForm({userId, parent}) {

    const formRef = createRef();
    const dispatch = useDispatch();
    const { modalLoading, modalErrorMsg, modalSuccessMsg } = useSelector(state => state.modal);

    const [modalHeight, setModalHeight] = useState(0);
    const [caption, setCaption] = useState('');
    const [mediaFile, setMediaFile] = useState(null);

    useEffect(() => {
        let height;
        if(parent === 'modal'){
            height = document.querySelector('.modal-body').clientHeight;
        } else {
            height = document.querySelector('form').clientHeight;
        }
        setModalHeight(height)
    }, [parent])

    useEffect(() => {
        if(modalErrorMsg === '' && modalSuccessMsg !== ''){
            setCaption('')
            setMediaFile(null)
        }

    }, [modalErrorMsg, modalSuccessMsg])

    const submitHandler = e => {
        e.preventDefault();
        dispatch(showErrorToastFun(false));
        dispatch(showSuccessToastFun(true));

        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('mediaFile', mediaFile);
        formData.append('creator', userId)

        dispatch(backendReqModal('/post/create', 'POST', formData, null));

    }

    const fileHandler = e => {
        if(e.target.files && e.target.files.length === 1){
            setMediaFile(e.target.files[0])
        } 
    }


    if(modalLoading){
        return <div className="d-flex flex-column justify-content-center align-items-center" style={{height: `${modalHeight}px`}}>
            <Loading />
            <span className="my-2">Please wait...</span>
        </div>
    } else {
        return (
        <form className="form p-0 p-sm-2 text-center" ref={formRef} onSubmit={submitHandler}>
            <InputElement 
                inputName="caption"
                inputText="Caption"
                inputType="text"
                inputValue={caption}
                onChangeHandler={e => setCaption(e.target.value)}
                classes="form-control"
                minLength="5"
                maxLength="200"
                checkText={true} 
            />
            <ImageUploader 
                mediaFile={mediaFile}
                fileHandler={fileHandler}
            />
            { 
            (modalErrorMsg) && 
                <span className="text-danger my-2"> 
                    {modalErrorMsg === 'Invalid value' ? 'Please provide both fields' : modalErrorMsg}
                </span>
             }
            <button type="submit" className="btn btn-secondary btn-block mt-2 mt-sm-3">Create Post</button>
        </form>
    )
    }
}

export default CreatePostForm
