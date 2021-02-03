import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { backendReqModal, modalError } from '../../../redux/actions/modalActions';
import ProfilePicUploader from './UIElements/ProfilePicUploader';
import ShowImage from './UIElements/ShowImage';

function ProfilePic({usr, isAdmin}) {

    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth);

    const [disable, setDisable] = useState(false);

    const fileHandler = e => {
        if(e.target.files && e.target.files.length === 1){
            const file = e.target.files[0];

        if(file.type === "image/jpg" || file.type === "image/png" || file.type === "image/jpeg"){
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
                const formData = JSON.stringify({
                    img_url: data.secure_url,
                    img_id: data.public_id
                })

                dispatch(backendReqModal(`/user/${userId}/update-image`, 'POST', formData, {
                    'Content-Type': 'application/json'
                }))
                setDisable(false)
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

    return (
            <>
            <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
                    <ShowImage src={usr.image} classes="rounded-circle profile-pic" />
                    {
                        isAdmin &&
                        <ProfilePicUploader 
                            fileHandler={fileHandler}
                            btnClass="mt-2 mt-sm-3 btn btn-secondary btn-sm rounded-pill px-3  py-1"
                            btnText="Edit Image"
                            disable={disable}
                        />
                    }         
            </div>
            </>
    )
}

export default ProfilePic
