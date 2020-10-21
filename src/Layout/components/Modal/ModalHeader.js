import React from 'react';
import { useSelector } from 'react-redux';
import ShowImage from '../Common/UIElements/ShowImage';

function ModalHeader() {
    const  { user } = useSelector(state => state.user);
    
    return (
        <>
            <ShowImage src={`http://localhost:3000/${user.image}`} width="30" height="30" classes="rounded-circle mr-1" /> <span>{user.username}</span>
        </>
    )
}

export default ModalHeader
