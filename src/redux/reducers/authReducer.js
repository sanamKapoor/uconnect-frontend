import * as Action from '../types/authTypes';

const initialState = {
    isLoggedIn: false, 
    userId: null,
    loading: false,
    authSuccess: '',
    authError: ''
}

export default (state = initialState, action) => {
    switch(action.type){
        case Action.AUTH_LOADING: 
            return {
                ...state,
                loading: true
            }
        case Action.AUTH_SUCCESS:
            return {
                ...state,
                authSuccess: action.payload,
                authError: ''
            }
        case Action.AUTH_ERROR:
            return {
                ...state,
                authError: action.payload,
                authSuccess: ''
            }
        case Action.AUTH_USER:
            return {
                ...state,
                userId: action.userId,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state
    }
}