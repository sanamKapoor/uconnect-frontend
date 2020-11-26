import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MainHeader from '../components/Common/MainHeader'
import CreatePostForm from '../components/Common/CreatePostForm'
import ShowToast from '../components/Common/UIElements/ShowToast'

import { fetchUserData } from '../../redux/actions/userActions'
import { modalError, modalMsg, showSuccessToastFun } from '../../redux/actions/modalActions'

function CreatePost() {

    const dispatch = useDispatch();
    const { userId } = useSelector(state => state.auth)
    const { modalSuccessMsg, showSuccessToast, modalErrorMsg } = useSelector(state => state.modal);
    
    useEffect(() => {
        dispatch(fetchUserData(`/user/${userId}`))
        dispatch(modalError(''))
    }, [dispatch, userId])

    useEffect(() => {
        const timer = setTimeout(() => {
          modalErrorMsg && dispatch(modalError(''))
          modalSuccessMsg && dispatch(modalMsg(''))
          !showSuccessToast && dispatch(showSuccessToastFun(true))
        }, 2000)
  
        return () => {
          clearTimeout(timer);
        }
      }, [dispatch, modalSuccessMsg, showSuccessToast, modalErrorMsg])

    return (
        <>
            <MainHeader />
            <div className="pt-5"></div>
            { (modalSuccessMsg && showSuccessToast) && <ShowToast msg={modalSuccessMsg} />} 
            <div className="container search-and-suggested-users my-5">
                <div className="suggested-users shadow p-3 rounded-lg">
                    <h5 className="text-center text-muted mb-3">Create Post</h5>
                    <CreatePostForm userId={userId} parent="page" />
                </div>
            </div>
        </>
    )
}

export default CreatePost
