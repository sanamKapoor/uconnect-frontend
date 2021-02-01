import * as Actions from '../types/modalTypes';
import { fetchProfilePosts } from './postActions';

export const modalLoading = loading => {
    return {
        type: Actions.MODAL_LOADING,
        payload: loading
    }
}

export const modalError = error => {
    return {
        type: Actions.MODAL_ERROR,
        payload: error
    }
}

export const modalMsg = msg => {
    return {
        type: Actions.MODAL_SUCCESS,
        payload: msg
    }
}

export const showSuccessToastFun  = show => {
    return {
        type: Actions.SHOW_SUCCESS_TOAST,
        payload: show
    }
}

export const showErrorToastFun  = show => {
    return {
        type: Actions.SHOW_ERROR_TOAST,
        payload: show
    }
}

//      Backend End Point

export const backendReqModal = (url, method, body = null, headers, fetchPostsAgain = false, userId = null) => async dispatch => {

    dispatch(modalLoading(true));

    try {
        const token = localStorage.getItem('jwtToken');
        if(headers !== null){
            headers = {
                ...headers,
                'Authorization': 'Bearer ' + token
            }
        } else {
            headers = {
                'Authorization': 'Bearer ' + token
            }
        }

        const res = await fetch(process.env.REACT_APP_BACKEND_URL + url, {
            method,
            body,
            mode: 'no-cors',
            headers
        })   
        const data = await res.json();

        if(!res.ok){
            throw new Error(data.message)
        }

        dispatch(modalLoading(false));
        dispatch(modalMsg(data.msg))
        
        if(fetchPostsAgain){
            dispatch(fetchProfilePosts(`/post/user/${userId}`))
        }
    } catch (err) {
        dispatch(modalError(err.message))
        dispatch(modalLoading(false))
    }

}
