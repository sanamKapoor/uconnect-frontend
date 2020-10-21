import * as Action from '../types/postTypes';

const initialState = {
    posts: [],
    post: {},
    postLoading: false,
    postError: '',
    profilePostErr: '',
    profilePostSuccessMsg: '',
    postSuccessMsg: '',
    fetchProfilePosts: [],
    fetchPostAgain: false
}

const updateAllPosts = (allPosts, post) => {
    const updatedPosts = [...allPosts];
    const updatedPostIndex = updatedPosts.findIndex(p => p._id === post._id);
    if (updatedPostIndex > -1) {
        updatedPosts[updatedPostIndex] = post;
    }

    return updatedPosts
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case Action.POST_LOADING:
            return {
                ...state,
                postLoading: action.payload,
            }
        case Action.POST_ERRORS:
            return {
                ...state,
                postError: action.payload
            }
        case Action.PROFILE_POST_ERROR:
            return {
                ...state,
                profilePostErr: action.payload, 
                fetchProfilePosts: []
            }
        case Action.GET_POST:
            return {
                ...state,
                post: action.payload,
                postError: ''
            }
        case Action.GET_POSTS:
            return {
                ...state,
                posts: action.payload,
                postError: ''
            }
        case Action.POST_SUCCESS_MSG:
            return {
                ...state,
                postSuccessMsg: action.payload
            }
        case Action.PROFILE_POST_SUCCESS_MSG:
            return {
                ...state,
                profilePostSuccessMsg: action.payload
            }
        case Action.UPDATE_POST:
            return{
                ...state,
                posts: updateAllPosts(state.posts, action.payload)
            }
        case Action.UPDATE_PROFILE_POST:
            return {
                ...state,
                fetchProfilePosts: updateAllPosts(state.fetchProfilePosts, action.payload)
            }
        case Action.FETCH_PROFILE_POSTS:
            return {
                ...state,
                fetchProfilePosts: action.payload,
                profilePostErr: ''
            }
        case Action.FETCH_POST_AGAIN:
            return {
                ...state,
                fetchPostAgain: action.payload
            }
        default:
            return state
    }
}

export default reducer;