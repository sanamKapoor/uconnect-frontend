import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import UserProfilePost from '.././Post/UserProfilePost'
import UserProfileData from './UserProfileData'
import ProfilePic from '../Common/ProfilePic';

import { modalMsg, modalError, showErrorToastFun, showSuccessToastFun } from '../../../redux/actions/modalActions';

function UserProfileLayout({ isAdmin, currentUser }) {

    const { profilePostErr, fetchProfilePosts } = useSelector(state => state.post);
    const { modalErrorMsg, modalSuccessMsg, showErrorToast, showSuccessToast } = useSelector(state => state.modal);

    const [myPosts, setMyPosts] = useState([]);

    useEffect(() => {
        setMyPosts(fetchProfilePosts);
    }, [fetchProfilePosts])

    const dispatch = useDispatch();

    useEffect(() => {
      const timer = setTimeout(() => {
        modalSuccessMsg && dispatch(modalMsg(''))
        modalErrorMsg && dispatch(modalError(''))
        !showErrorToast && dispatch(showErrorToastFun(true))
        !showSuccessToast && dispatch(showSuccessToastFun(true))
      }, 2000)

      return () => {
        clearTimeout(timer);
      }
    }, [dispatch, modalErrorMsg, modalSuccessMsg, showSuccessToast, showErrorToast])


    if(currentUser){
        return (
            <>
            <div className="container-lg my-4">
            <Link to="/" className="mb-4">
                <i className="fas fa-arrow-left post-icon text-secondary ml-1"></i>        
            </Link>
                <div className="row"> 
                        <>
                            { currentUser.image && <ProfilePic usr={currentUser} isAdmin={isAdmin} /> }
                            <UserProfileData usr={currentUser} isAdmin={isAdmin} />
                        </>
                </div>
                {
                    (profilePostErr) && <p className="text-center text-muted mt-3">{profilePostErr}</p>
                }
                {
                    (!profilePostErr && myPosts.length > 0) &&
                    <>
                    <h4 className="mt-2 mt-sm-3 mt-md-4 mt-lg-5 post-headline">All Posts</h4> 
                    <hr />       
                    <div className="user-post-row my-4">
                        {
                            myPosts.map(post => {
                                return <UserProfilePost key={post._id} post={post} isAdmin={isAdmin} />
                            })
                        }
                    </div>
                    </>
                }
                <div className="py-2 py-lg-0"></div>
            </div>
            </>
        )
    } else {
       return (
           <div className="text-center mt-4">
               Something went wrong!
           </div>
       )
    }
}

export default UserProfileLayout
