import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { backendReqModal, showSuccessToastFun } from '../../redux/actions/modalActions';

function useCommentHook() {

    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth);
    const [comment, setComment] = useState('');

    const writeComment = (e, postId) => {
        e.preventDefault();
        dispatch(showSuccessToastFun(false))
        
        const commentObj = JSON.stringify({ 
            comment,
            user: userId
        })

        dispatch(backendReqModal(`/post/${postId}/comment`, 'POST', commentObj, { 'Content-Type': 'application/json' }))
        setComment('')
    }

    return [ comment, setComment, writeComment ]
    
}

export default useCommentHook
