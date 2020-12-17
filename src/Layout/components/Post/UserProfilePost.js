import React, { useState } from 'react';

import PostModal from '../Modal/PostModal';
import EditPostModal from '../Modal/EditPostModal';
import WarningModal from '../Modal/WarningModal';
import ShowImage from '../Common/UIElements/ShowImage';

function UserProfilePost({post, isAdmin}) {

    const [showPost, setShowPost] = useState(false);
    const [editPost, setEditPost] = useState(false);
    const [warning, setWarning] = useState(false);
    const [warningMsg, setWarningMsg] = useState('');

    const warningMsgFun = (msg) => {
        setWarning(true);
        setWarningMsg(msg)
    }

    if(post) {

    return (
        <>
            <div className="shadow p-2">
                {
                    post.mediaFile.isVideo ?  
                    <div className="all-posts-img">
                        <video src={`${process.env.REACT_APP_BACKEND_URL}/${post.mediaFile.filePath}`} controls controlsList="nodownload" autoPlay muted loop style={{height: '100%', width: '100%', display: 'flex'}}></video>
                    </div>
                    : 
                    <ShowImage src={`${process.env.REACT_APP_BACKEND_URL}/${post.mediaFile.filePath}`} classes="all-posts-img" />
                }
                {
                    isAdmin &&
                    <div className="row text-center mt-2">
                        <div className="col">
                            <i className="far fa-eye post-icon" onClick={() => setShowPost(true)}></i>
                        </div>
                        <div className="col">
                            <i className="fas fa-edit post-icon" onClick={() => setEditPost(true)}></i>
                        </div>
                        <div className="col">
                            <i className="far fa-trash-alt post-icon" onClick={() => warningMsgFun('Are you sure you want to delete this post ?')}></i>
                        </div>
                    </div>
                }
            </div>

            <PostModal 
                show={showPost}
                onHide={() => setShowPost(false)}
                post={post}
                isAdmin={isAdmin}
            />

            <EditPostModal 
                show={editPost}
                onHide={() => setEditPost(false)}
                postId={post._id}
            />

            <WarningModal 
                show={warning}
                onHide={() => setWarning(false)}
                msg={warningMsg}
                element="post"
                postId={post._id}
            />
        </>
    )
    } else {
        return ''
    }
}

export default UserProfilePost
