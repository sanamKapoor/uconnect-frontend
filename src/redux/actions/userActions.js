import * as Actions from '../types/userTypes';

const userLoading = (isLoading) => {
    return {
        type: Actions.USER_LOADING,
        payload: isLoading
    }   
}

export const userErrors = (err) => {
    return {
        type: Actions.USER_ERRORS,
        payload: err
    }   
}

const userSuccess = msg => {
    return {
        type: Actions.USER_SUCCESS_MSG,
        payload: msg
    }
}

export const getUsers = (users) => {
    return {
        type: Actions.GET_USERS,
        payload: users
    }   
}

export const getUser = (user) => {
    return {
        type: Actions.GET_USER,
        payload: user
    }   
}

export const updateUser = (user) => {
    return {
        type: Actions.UPDATE_USER,
        payload: user
    }
}

export const updateOtherUser = user => {
    return {
        type: Actions.UPDATE_OTHER_USER,
        payload: user
    }
}

//      Backend End-Point
export const fetchUserData = (url, method = 'GET', body = null, headers) => async dispatch => {

    if(method === 'GET'){
        dispatch(userLoading(true));
    }
    try {
        const token = localStorage.getItem('jwtToken');

        const res = await fetch(url, {
            method,
            body,
            headers: {
                ...headers,
                'Authorization': 'Bearer ' + token 
            }
        })   

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.message)
        }

        dispatch(userLoading(false));

        const { users, user, msg } = data;

        if(users){
            dispatch(getUsers(users))
        }
        if(user){
            dispatch(getUser(user))
        }
        if(!user && !users && msg){
            dispatch(userSuccess(msg))
        }
    } catch (err) {
        dispatch(userErrors(err.message))
        dispatch(userLoading(false))
    }
}
