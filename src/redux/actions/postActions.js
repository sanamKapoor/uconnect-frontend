import * as Action from '../types/postTypes';
import download from 'downloadjs';

const postLoading = (isLoading) => {
    return {
        type: Action.POST_LOADING,
        payload: isLoading
    }   
}

export const postErrors = (err) => {
    return {
        type: Action.POST_ERRORS,
        payload: err
    }   
}

const profilePostErrors = (err) => {
    return {
        type: Action.PROFILE_POST_ERROR,
        payload: err
    }   
}

export const postSuccess = msg => {
    return {
        type: Action.POST_SUCCESS_MSG,
        payload: msg
    }
}

export const profilePostSuccess = msg => {
    return {
        type: Action.POST_SUCCESS_MSG,
        payload: msg
    }
}

export const getPosts = (posts) => {
    return {
        type: Action.GET_POSTS,
        payload: posts
    }   
}

export const getPost = (post) => {
    return {
        type: Action.GET_POST,
        payload: post
    }   
}

export const updatePost = post => {
    return {
        type: Action.UPDATE_POST,
        payload: post
    }
}

export const updateProfilePost = post => {
    return {
        type: Action.UPDATE_PROFILE_POST,
        payload: post
    }
}

export const profilePosts = posts => {
    return {
        type: Action.FETCH_PROFILE_POSTS,
        payload: posts
    }
}

export const fetchPostAgainFun = fetchNow => {
    return {
        type: Action.FETCH_POST_AGAIN,
        payload: fetchNow
    }
}

//      Backend End-Point 
export const fetchPostData = (url, method = 'GET', body = null, headers) => async dispatch => {

    if(method === 'GET'){
        dispatch(postLoading(true));
    }
    try {
        const token = localStorage.getItem('jwtToken');

        const res = await fetch(process.env.REACT_APP_BACKEND_URL + url, {
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

        dispatch(postLoading(false));
        
        const { posts, post, msg } = data;

        if(posts){
            dispatch(getPosts(posts))
        }
        if(post){
            dispatch(getPost(post))
        }
        if(!posts && !post && msg){
            dispatch(postSuccess(msg))
        }
    } catch (err) {
        dispatch(postLoading(false))
        err.message ? dispatch(postErrors(err.message)) : dispatch(postErrors(err))
    }

}

export const fetchProfilePosts = url => async dispatch => {
    try {
        const token = localStorage.getItem('jwtToken');

        const res = await fetch(process.env.REACT_APP_BACKEND_URL + url, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });
        const data = await res.json();
        if(!res.ok){
            throw new Error(data.message)
        }
        
        const { posts, msg } = data;

        if(posts){
            dispatch(profilePosts(posts))
        }
        if(!posts && msg){
            dispatch(profilePostSuccess(msg))
        }
    } catch (err) {
        err.message ? dispatch(profilePostErrors(err.message)) : dispatch(profilePostErrors(err))
    }
}

export const fileDownload = (url, file) => async dispatch => {
    try {
        const res = await fetch(url);
        const blob = await res.blob();
        download(blob, file);
    } catch (err) {
        err.message ? dispatch(postErrors(err.message)) : dispatch(postErrors(err))
    }
}