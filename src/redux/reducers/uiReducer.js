import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_SIMPLE,
    ENQUEUE_SNACKBAR,
    CLOSE_SNACKBAR,
    REMOVE_SNACKBAR,
    SET_SUCCESS,
    CLEAR_SUCCESS,


} from '../types';
const initialState = {
    loading: false,
    errors: null,
    success: null,

};

export default function (state = initialState, action) {
    switch (action.type) {


        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                    errors: action.payload,
            };

            case SET_SUCCESS:
            return {
                ...state,
                loading: false,
                    success: action.payload,
            };

            case CLEAR_SUCCESS: 
            return {
                ...state,
                loading: false,
                    success: null,
            }; 

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                    errors: null,
            };

        case LOADING_UI:
            return {
                ...state,
                loading: true,
            }



            default:
                return state;

    }
}