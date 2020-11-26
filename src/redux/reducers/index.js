import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';
import authReducer from './authReducer';

const reducer = combineReducers({
    post: postReducer,
    user: userReducer,
    modal : modalReducer,
    auth: authReducer
})

export default reducer;