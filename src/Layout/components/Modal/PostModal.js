import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

import VideoPlayer from '../Common/UIElements/VideoPlayer';
import ShowImage from '../Common/UIElements/ShowImage';
import Comment from '../Common/UIElements/Comment';
import ModalHeader from './ModalHeader';
import WriteCommentForm from '../Common/WriteCommentForm';
import UsersModal from '../Modal/UsersModal';

function PostModal(props) {

    const { show, onHide, post, isAdmin } = props;
    const [usersModal, setUsersModal] = useState(false);

    return (
      <>
      <Modal
        show={show}
        onHide={onHide}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="h6" id="contained-modal-title-vcenter">
            <ModalHeader />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
        <div className="row no-gutters">
            <div className="col-12 col-lg-7 p-2">
                {
                    post.mediaFile.isVideo ? 
                    <VideoPlayer src={`${process.env.REACT_APP_BACKEND_URL}/${post.mediaFile.filePath}`} classes="modal-image" height="auto" />
                    : 
                    <ShowImage src={`${process.env.REACT_APP_BACKEND_URL}/${post.mediaFile.filePath}`} classes="modal-image" />
                }
                <div className="modal-post-content">
                  {
                    post.likes.length > 0 &&
                    <>
                    <small className='pb-2 font-weight-bold pointer' onClick={() => setUsersModal(true)}>Liked by {post.likes.length} people</small>
                    <br />
                    </>
                  }
                  <small className="text-break">{post.caption}</small>
                </div>
            </div>
              <div className="col-12 col-lg-5 d-flex flex-column justify-content-between px-2">
                <div className="all-comments order-1 order-lg-0">
                    {
                      (post.comments.length > 0) ?
                      post.comments.map(u => {
                        return <Comment key={u._id} usr={u} postId={post._id} isAdmin={isAdmin} />
                      })
                      : 
                      <div className="d-none d-lg-flex justify-content-center align-items-center text-muted">
                        <span className="my-2">No Comments</span>
                      </div>
                    }
                </div>
                <WriteCommentForm postId={post._id} />
              </div>
        </div>
        </Modal.Body>
      </Modal>

            <UsersModal
                show={usersModal}
                onHide={() => setUsersModal(false)}
                propsUsers={post.likes}
                errorText="No User Found."
            />
      </>
    );
  }
  
  
 export default PostModal;