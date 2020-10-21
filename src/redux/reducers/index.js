import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import postReducer from './postReducer';
import userReducer from './userReducer';

const reducer = combineReducers({
    post: postReducer,
    user: userReducer,
    modal : modalReducer
})

export default reducer;