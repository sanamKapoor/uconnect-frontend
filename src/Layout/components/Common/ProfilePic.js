import React, { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { backendReqModal } from '../../../redux/actions/modalActions';
import ShowImage from './UIElements/ShowImage';

function ProfilePic({usr, isAdmin}) {

    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.user);

    const filePickerRef = createRef();

    const pickerFileHandler = () => {
        filePickerRef.current.click();
    }

    const fileHandler = e => {
        if(e.target.files && e.target.files.length === 1){
            const formData = new FormData();
            formData.append('image', e.target.files[0]);

            dispatch(backendReqModal(`/user/${userId}/update-image`, 'POST', formData, {}))
        } 
    }

    return (
            <>
            <div className="col-12 col-md-4 d-flex flex-column justify-content-center align-items-center">
                    <ShowImage src={`http://localhost:3000/${usr.image}`} classes="rounded-circle profile-pic" />
                    {
                        isAdmin &&
                        <>
                        <input 
                            type="file"
                            ref={filePickerRef}
                            style={{"display": "none"}}
                            // accept=".jpg,.jpeg,.png"
                            onChange={fileHandler}
                            />
                        <button className="mt-2 mt-sm-3 btn btn-secondary btn-sm rounded-pill px-3  py-1" onClick={pickerFileHandler}>Edit Image</button>
                        </>
                    }         
            </div>
            </>
    )
}

export default ProfilePic
