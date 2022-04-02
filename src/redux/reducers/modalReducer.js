import * as Actions from '../types/modalTypes';

const initialState = {
    modalLoading: false,
    modalErrorMsg: '',
    modalSuccessMsg: '',
    showSuccessToast: true,
    showErrorToast: true
}

export default (state = initialState, action) => {
    switch(action.type){
        case Actions.MODAL_LOADING:
            return {
                ...state,
                modalLoading: action.payload,
            }
        case Actions.MODAL_ERROR:
            return {
                ...state,
                modalLoading: false,
                modalErrorMsg: action.payload,
                modalSuccessMsg: ''
            }
        case Actions.MODAL_SUCCESS:
            return {
                ...state,
                modalLoading: false,
                modalErrorMsg: '',
                modalSuccessMsg: action.payload
            }
        case Actions.SHOW_ERROR_TOAST:
            return {
                ...state,
                showErrorToast: action.payload
            }
        case Actions.SHOW_SUCCESS_TOAST:
            return {
                ...state,
                showSuccessToast: action.payload
            }
        default:
            return state
    }
}