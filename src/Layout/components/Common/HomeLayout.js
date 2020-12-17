import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch  } from 'react-redux';
import openSocket from 'socket.io-client';

import SinglePost from '../Post/SinglePost'
import Loading from '../Common/UIElements/Loading';
import ShowSearchResults from './UIElements/ShowSearchResults';
import ShowSearchInputOrNot from './UIElements/ShowSearchInputOrNot';

import useSearchUserHook from '../../hooks/search-users-hook';
import { fetchPostData, updatePost, fetchPostAgainFun } from '../../../redux/actions/postActions';
import { fetchUserData, updateUser } from '../../../redux/actions/userActions';
import { modalMsg, modalError, showErrorToastFun, showSuccessToastFun } from '../../../redux/actions/modalActions';

function HomeLayout() {

    const dispatch = useDispatch();
    const { postError, postLoading, posts, fetchPostAgain } = useSelector(state => state.post);
    const { users } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    const { modalErrorMsg, modalSuccessMsg, showErrorToast, showSuccessToast } = useSelector(state => state.modal);

    const [ userFound, searchResults, searchUser, setSearchUser, setUserFound, showSearchUserHandler ] = useSearchUserHook();
    const [connectionsPost, setConnectionsPost] = useState([])

    useEffect(() => {
        dispatch(fetchPostData(`/post/show-posts/${userId}`))
        dispatch(fetchUserData(`/user/${userId}`))
        dispatch(showErrorToastFun(true))
        dispatch(showSuccessToastFun(false))
        dispatch(fetchPostAgainFun(true))
    }, [dispatch, userId])

    useEffect(() => {
        if(posts){
            setConnectionsPost(posts)
        }
    }, [posts])

    useEffect(() => {
            const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
            socket.on('posts', data => {
                if(data.action === 'GetPost'){
                    dispatch(updatePost(data.data))
                }
            })
            socket.on('users', data => {
                if(data.action === 'ConnectOrBlockUser' && fetchPostAgain){
                    dispatch(updateUser(data.user))
                    dispatch(fetchPostData(`/post/show-posts/${userId}`))
                }
            })
    }, [dispatch, userId, fetchPostAgain])

    useEffect(() => {
        const timer = setTimeout(() => {
          modalSuccessMsg && dispatch(modalMsg(''))
          modalErrorMsg && dispatch(modalError(''))
          !showErrorToast && dispatch(showErrorToastFun(true))
          showSuccessToast && dispatch(showSuccessToastFun(false))
        }, 2000)
  
        return () => {
          clearTimeout(timer);
        }
      }, [dispatch, modalErrorMsg, modalSuccessMsg, showSuccessToast, showErrorToast])

    return (
    <>
    <div className="container-fluid container-md mt-5">
        <div className="row no-gutters mx-1 mx-sm-3 mx-md-4">
            <div className={`col-12 col-lg-7 post-area mt-5`}>
                {
                    (!postLoading && postError) && <p className="text-center">{postError}</p>
                }
                {
                    (postLoading) && <div className="text-center">
                        <Loading />
                    </div>
                }
                {
                    (!postError && !postLoading && connectionsPost.length > 0) &&
                    connectionsPost.map(post => {
                        return <SinglePost key={post._id} post={post} />
                    })
                }
            </div>
            <div className="col-5 mt-5 d-none d-lg-block">
            { 
                ( users.length > 0) &&
                <div className="suggested-users shadow w-75 mx-auto p-3 rounded-lg">
                    <ShowSearchInputOrNot
                        users={users} 
                        userId={userId} 
                        searchUser={searchUser}
                        setSearchUser={setSearchUser}
                        setUserFound={setUserFound}
                        showSearchUserHandler={showSearchUserHandler}
                    />
                    <div className="suggested-users-list" >
                        <ShowSearchResults 
                            users={users} 
                            userId={userId}
                            userFound={userFound}
                            searchUser={searchUser}
                            searchResults={searchResults}
                            showOption={true}
                        />
                    </div>
                </div>
            }
            </div>
        </div>
    </div>
    </>
    )
}

export default HomeLayout
