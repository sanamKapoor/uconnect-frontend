import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import openSocket from 'socket.io-client';

import UserProfileLayout from '../components/User/UserProfileLayout'
import Loading from '../components/Common/UIElements/Loading';
import ShowToast from '../components/Common/UIElements/ShowToast';

import { fetchUserData, updateUser, updateOtherUser, userErrors } from '../../redux/actions/userActions';
import { fetchProfilePosts, profilePosts, updateProfilePost, fetchPostAgainFun } from '../../redux/actions/postActions';

function ProfilePage() {

    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth);
    const { userErrorMsg, userLoading, users } = useSelector(state => state.user);
    const { modalSuccessMsg, modalErrorMsg, showSuccessToast, showErrorToast } = useSelector(state => state.modal);

    const { id } = useParams();
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        setIsAdmin(false);
        dispatch(profilePosts([]))
        dispatch(fetchPostAgainFun(false))
        dispatch(userErrors(''))
        dispatch(fetchProfilePosts(`/post/user/${id}`))
        if(userId !== null){
            dispatch(fetchUserData('/user'))
            dispatch(fetchUserData(`/user/${userId}`))
        }
        if(id === userId){
            setIsAdmin(true);
        } 
    }, [id, userId, dispatch])

    useEffect(() => {
        for(let user of users){
            if(user._id === id){
                setCurrentUser(user);
                break;
            }
        }
    }, [id, users])

    useEffect(() => {
            const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
            socket.on('posts', data => {
                if(data.action === 'GetPost'){
                    dispatch(updateProfilePost(data.data))
                }
                if(data.action === 'GetAllPosts'){
                    dispatch(updateUser(data.creator))
                    dispatch(updateOtherUser(data.creator))
                }
            })
            socket.on('users', data => {
                if(data.action === 'GetUser' || data.action === 'ConnectOrBlockUser'){
                    dispatch(updateUser(data.user))
                    dispatch(updateOtherUser(data.user))
                    if(data.otherUser !== null){
                        dispatch(updateOtherUser(data.otherUser))
                    }
                }
            })
    }, [dispatch])

        if(userLoading){
            return <div className="text-center mt-4"><Loading /></div>
        }
        else if(userErrorMsg && !userLoading){
            return <p className="text-center mt-4">{userErrorMsg}</p>
        }
        return (
            <>
                { (modalSuccessMsg && showSuccessToast) && <ShowToast msg={modalSuccessMsg} /> }
                { (modalErrorMsg && showErrorToast) && <ShowToast msg={modalErrorMsg} /> }
                <UserProfileLayout isAdmin={isAdmin} currentUser={currentUser} /> 
            </>
        )
}

export default ProfilePage
