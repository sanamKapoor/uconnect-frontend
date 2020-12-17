import React from 'react';
import { useSelector } from 'react-redux';
import ShowImage from '../Common/UIElements/ShowImage';

function ModalHeader() {
    const  { user } = useSelector(state => state.user);
    
    return (
        <>
            <ShowImage src={user.image.startsWith('https://', 0) ? user.image : `${process.env.REACT_APP_BACKEND_URL}/${user.image}`} width="30" height="30" classes="rounded-circle mr-1" /> <span>{user.username}</span>
        </>
    )
}

export default ModalHeader
