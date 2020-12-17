import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { backendReqModal, showSuccessToastFun } from '../../../../redux/actions/modalActions';
import ShowImage from './ShowImage';

function Comment({ usr, postId, isAdmin }) {
    
    const dispatch = useDispatch();
    const { users } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);

    const [commentedUser, setCommentedUser] = useState('');
    const [img, setImg] = useState('');
    const [showDeleteBtn, setShowDeleteBtn] = useState(false);

    useEffect(() => {
        users.filter(u => {
            if(u._id === usr.user){
                setCommentedUser(u)
            }
            return false;
        })

        if(userId === usr.user || isAdmin){
            setShowDeleteBtn(true)
        }
    }, [usr.user, userId, users, isAdmin])

    useEffect(() => {
        if(commentedUser){
            commentedUser.image.startsWith('https://', 0) ? setImg(commentedUser.image) : setImg(`${process.env.REACT_APP_BACKEND_URL}/${commentedUser.image}`)
        }
    }, [commentedUser])

    const deleteMyComment = () => {
        dispatch(showSuccessToastFun(false))
        if(isAdmin){
            dispatch(backendReqModal(`/post/${postId}/${commentedUser._id}/${userId}/auth-comments`, 'DELETE'))
        } else {
            dispatch(backendReqModal(`/post/${postId}/${userId}/comment`, 'DELETE'))
        }
    }

        return (
            <div className="post-user p-2">
                <ShowImage src={img} width="20" height="20" classes="rounded-circle mr-1" />
                <Link to={`/profile/${commentedUser._id}`} className="text-dark text-decoration-none">
                    <small>{commentedUser.username}</small>            
                </Link>
                <br />
                <small className="text-muted text-break">{usr.text} {showDeleteBtn && <i className="far fa-trash-alt float-right m-1 pointer" onClick={deleteMyComment}></i>}</small>
            </div>
        )
}

export default Comment
