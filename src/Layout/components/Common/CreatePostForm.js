import React, { useState, useEffect, createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { backendReqModal, modalError, showErrorToastFun, showSuccessToastFun } from '../../../redux/actions/modalActions';

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
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaId, setMediaId] = useState('');
    const [mediaName, setMediaName] = useState('');
    const [disable, setDisable] = useState(false);

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

        const postData = JSON.stringify({
            caption,
            mediaFile: {
                mediaId: mediaId,
                fileName: mediaName,
                filePath: mediaUrl
            },
            creator: userId
        })

        dispatch(backendReqModal('/post/create', 'POST', postData, {
            'Content-Type': 'application/json'
        }));

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
         } else {
            dispatch(modalError('Invalid file type'))
            return;
         }
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
                disable={disable}
            />
            { 
            (modalErrorMsg) && 
                <span className="text-danger my-2"> 
                    {modalErrorMsg === 'Invalid value' ? 'Please provide both fields' : modalErrorMsg}
                </span>
             }
            <button type="submit" disabled={disable} className="btn btn-secondary btn-block mt-2 mt-sm-3">
                { disable ? 'Please wait...' : 'Create Post'}
            </button>
        </form>
    )
    }
}

export default CreatePostForm
