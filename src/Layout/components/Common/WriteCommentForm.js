import React from 'react'

import useCommentHook from '../../hooks/write-comment-hook';
import InputElement from '../Common/UIElements/InputElement';

function WriteCommentForm({postId}) {

    const [comment, setComment, writeComment] = useCommentHook();

    return (
        <form className="comment-form" onSubmit={e => writeComment(e, postId)}>
            <InputElement 
                inputType="text" 
                inputName="comment" 
                inputValue={comment} 
                onChangeHandler={e => setComment(e.target.value)} 
                classes="border-0 w-75 my-2 comment" 
                inputText="Add Comment" 
                maxLength="100"
                checkText={false}
            />
            <button type="submit" className="btn comment-form-btn text-muted float-right">Post</button>
        </form>
    )
}

export default WriteCommentForm
