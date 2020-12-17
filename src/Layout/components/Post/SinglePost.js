import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import PostModal from '../Modal/PostModal';
import UsersModal from '../Modal/UsersModal';
import VideoPlayer from '../Common/UIElements/VideoPlayer';
import ShowImage from '../Common/UIElements/ShowImage';
import WriteCommentForm from '../Common/WriteCommentForm';

import { fileDownload } from '../../../redux/actions/postActions';
import { backendReqModal } from '../../../redux/actions/modalActions';

function SinglePost({post}) {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user)
    const { userId } = useSelector(state => state.auth)

    const [postModal, setPostModal] = useState(false);
    const [usersModal, setUsersModal] = useState(false);
    const [likeBtn, setLikeBtn] = useState(false)
    const [showComment, setShowComment] = useState('');

    useEffect(() => {
        setLikeBtn(false);

        for(let user of post.likes){
            if(user === userId){
                setLikeBtn(true)
                break;
            } 
        }

        for(let u of post.comments){
            if(u.user === userId){
                setShowComment(u.text);
                break;
            } else {
                setShowComment('');
            }
        }

    }, [post, userId, dispatch])

    const likeHandler = () => {
        dispatch(backendReqModal(`/post/${post._id}/${userId}/like-unlike`, 'POST'))
    }

    const fileDownloadHandler = (file) => {
        dispatch(fileDownload(file))
    }

    const deleteMyComment = () => {
        dispatch(backendReqModal(`/post/${post._id}/${userId}/comment`, 'DELETE'))
    }

    const blockUser = () => {
        dispatch(backendReqModal(`/user/${post.creator._id}/block/${userId}`, 'POST'))
    }

    if(post.creator._id !== userId){
    return (
        <>
        <div className="post shadow mb-4">
                <div className="post-header p-2 d-flex justify-content-between align-items-center">
                    <Link to={`/profile/${post.creator._id}`} className="post-user pointer text-dark text-decoration-none">
                        <ShowImage src={post.creator.image} classes="rounded-circle mr-1 header-user-img" /> {post.creator.username}
                    </Link>
                    <div className="text-info mr-2 pointer" onClick={blockUser}>Block</div>
                </div>
                <div className="post-content">
                {
                    post.mediaFile.isVideo ?
                    <VideoPlayer src={`${process.env.REACT_APP_BACKEND_URL}/${post.mediaFile.filePath}`} classes="post-image" height="100%" />
                    : 
                    <ShowImage src={`${process.env.REACT_APP_BACKEND_URL}/${post.mediaFile.filePath}`} classes="post-image" />
                }
                </div>
                <div className="post-metadata p-2">
                    <div className="post-buttons d-flex justify-content-between align-items-center">
                        <div>
                            <i className={`fas fa-heart ${likeBtn ? 'text-danger' : 'text-secondary'} mx-1 post-icon`} onClick={likeHandler}></i>
                            <i className="far fa-comment text-dark mx-1 post-icon" onClick={() => setPostModal(true)}></i>
                        </div>
                        <i className="fas fa-download text-dark post-icon" onClick={() => fileDownloadHandler(post.mediaFile.fileName)}></i>
                    </div>
                    {
                        post.likes.length > 0 &&
                        <>
                            <small className="font-weight-bold pointer" onClick={() => setUsersModal(true)}>
                            Liked by {post.likes.length} people</small>
                            <br/>
                        </>
                    }
                    <small className="text-break">{post.caption}</small>
                    <br />
                    {
                        (showComment && user && post.comments.length > 0) ?
                        <small>
                            <ShowImage src={user.image} width="20" height="20" classes="rounded-circle mr-1" /> 
                            {user.username}
                            <span className="font-weight-bold text-secondary text-break"> {showComment} <i className="far fa-trash-alt text-danger ml-2 pointer" onClick={deleteMyComment}></i></span>
                        </small>
                        : ''
                    }
                    <WriteCommentForm 
                        postId={post._id}
                    />
                </div>
            </div>

            <PostModal
                show={postModal}
                onHide={() => setPostModal(false)}
                post={post}
            />
            
            <UsersModal
                show={usersModal}
                onHide={() => setUsersModal(false)}
                propsUsers={post.likes}
                errorText="No User Found."
            />
        </>
    )
    } else {
        return ''
    }
}

export default SinglePost
