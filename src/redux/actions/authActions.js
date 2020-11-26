import * as Action from '../types/authTypes';
import jwt_decode from 'jwt-decode';

export const authLoading = loading => {
    return {
        type: Action.AUTH_LOADING,
        payload: loading
    }
}

export const authSuccessMsg = msg => {
    return {
        type: Action.AUTH_SUCCESS,
        payload: msg
    }
}

export const authErrorMsg = err => {
    return {
        type: Action.AUTH_ERROR,
        payload: err
    }
}

export const setCurrentUser = (userId, isLoggedIn) => {
    return {
        type: Action.AUTH_USER,
        userId: userId,
        isLoggedIn: isLoggedIn
    }
}

export const logOutUser = () => dispatch => {
    localStorage.removeItem('jwtToken')
    dispatch(setCurrentUser(null, false))
}

export const authEndPoint = (url, method = 'GET', body, headers) => async dispatch => {
    dispatch(authLoading(true))

    try {
        const res = await fetch(url, {
            method,
            body, 
            headers
        })
        const data = await res.json();

        if(!res.ok){
            throw new Error(data.message)
        }

        dispatch(authLoading(false));
        dispatch(authSuccessMsg(data.msg))

        if(data.token){
          const { token } = data;
          localStorage.setItem('jwtToken', token);
          const decoded = jwt_decode(token);
          dispatch(setCurrentUser(decoded.userId, true));
        }
    } catch (error) {
        dispatch(authLoading(false))
        dispatch(authErrorMsg(error.message))
    }
}