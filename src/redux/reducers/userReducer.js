import * as Action from '../types/userTypes';

const initialState = {
    users: [],
    user: {},
    userId: '5f8084f4d074fb1404000cc5',
    userLoading: false,
    userError: '',
    userSuccessMsg: ''
}

const updateUserFromUsersArray = (users, user) => {
    const updatedUsers = [...users];
    const updatedUserIndex = updatedUsers.findIndex(u => u._id === user._id);
    if (updatedUserIndex > -1) {
        updatedUsers[updatedUserIndex] = user;
    }

    return updatedUsers
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case Action.USER_LOADING:
            return {
                ...state,
                userLoading: action.payload,
            }
        case Action.USER_ERRORS:
            return {
                ...state,
                userErrorMsg: action.payload
            }
        case Action.GET_USERS:
            return {
                ...state,
                users: action.payload,
                userError: ''
            }
        case Action.GET_USER:
            return {
                ...state,
                user: action.payload,
                userError: ''
            }
        case Action.USER_SUCCESS_MSG:
            return {
                ...state,
                userSuccessMsg: action.payload
            }
        case Action.UPDATE_USER:
            return {
                ...state,
                user: action.payload
            }
        case Action.UPDATE_OTHER_USER:
            return {
                ...state,
                users: updateUserFromUsersArray(state.users, action.payload)
            }
        default:
            return state
    }
}

export default reducer;