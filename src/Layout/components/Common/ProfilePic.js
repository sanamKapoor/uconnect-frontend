import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { backendReqModal } from '../../../redux/actions/modalActions';
import ProfilePicUploader from './UIElements/ProfilePicUploader';
import ShowImage from './UIElements/ShowImage';

function ProfilePic({usr, isAdmin}) {

    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth);

    const fileHandler = e => {
        if(e.target.files && e.target.files.length === 1){
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            dispatch(backendReqModal(`/user/${userId}/update-image`, 'POST', formData, null))
        } 
    }

    return (
            <>
            <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
                    <ShowImage src={usr.image.startsWith('https://', 0) ? usr.image : `${process.env.REACT_APP_BACKEND_URL}/${usr.image}`} classes="rounded-circle profile-pic" />
                    {
                        isAdmin &&
                        <ProfilePicUploader 
                            fileHandler={fileHandler}
                            btnClass="mt-2 mt-sm-3 btn btn-secondary btn-sm rounded-pill px-3  py-1"
                            btnText="Edit Image"
                        />
                    }         
            </div>
            </>
    )
}

export default ProfilePic
