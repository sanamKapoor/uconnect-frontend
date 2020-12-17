import React, { useEffect } from 'react';
import openSocket from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

import useSearchUserHook from '../hooks/search-users-hook';

import ShowToast from '../components/Common/UIElements/ShowToast';
import MainHeader from '../components/Common/MainHeader'
import Loading from '../components/Common/UIElements/Loading';
import ShowSearchResults from '../components/Common/UIElements/ShowSearchResults';
import ShowSearchInputOrNot from '../components/Common/UIElements/ShowSearchInputOrNot';

import { fetchUserData, updateUser } from '../../redux/actions/userActions';
import { modalError, showErrorToastFun } from '../../redux/actions/modalActions';

function SearchUsers() {

    const dispatch = useDispatch();
    const { users, userLoading, userErrorMsg } = useSelector(state => state.user);
    const { userId } = useSelector(state => state.auth);
    const { modalErrorMsg, showErrorToast } = useSelector(state => state.modal);
    
    const [ userFound, searchResults, searchUser, setSearchUser, setUserFound, showSearchUserHandler ] = useSearchUserHook();

    useEffect(() => {
        dispatch(fetchUserData(`/user/${userId}`))
    }, [userId, dispatch])

    useEffect(() => {
        const socket = openSocket(process.env.REACT_APP_BACKEND_URL);
        socket.on('users', data => {
            if(data.action === 'ConnectOrBlockUser'){
                dispatch(updateUser(data.user))
            }
        })
    }, [dispatch])

    useEffect(() => {
        const timer = setTimeout(() => {
          modalErrorMsg && dispatch(modalError(''))
          !showErrorToast && dispatch(showErrorToastFun(true))
        }, 2000)
  
        return () => {
          clearTimeout(timer);
        }
      }, [dispatch, modalErrorMsg, showErrorToast])

    return (
        <>
            <MainHeader />       
            { (modalErrorMsg && showErrorToast) && <ShowToast msg={modalErrorMsg} /> } 
            <div className="pt-5"></div>
            <div className="container search-and-suggested-users my-5">
            { userLoading && <div className="text-center"><Loading /></div> }
            { 
                (userErrorMsg && !userLoading) && <div className="text-center">{userErrorMsg}</div> 
            } 
            { 
              (!userErrorMsg && !userLoading && users.length > 0) &&
                <div className="suggested-users shadow p-2 p-sm-3 rounded-lg">
                    <ShowSearchInputOrNot
                        users={users} 
                        userId={userId} 
                        searchUser={searchUser}
                        setSearchUser={setSearchUser}
                        setUserFound={setUserFound}
                        showSearchUserHandler={showSearchUserHandler}
                    />
                <>
                    <ShowSearchResults 
                        users={users} 
                        userId={userId}
                        userFound={userFound}
                        searchUser={searchUser}
                        searchResults={searchResults}
                     />
                </>
                </div>
                }
            </div>
            <div className="pt-4"></div>
        </>
    )
}

export default SearchUsers
