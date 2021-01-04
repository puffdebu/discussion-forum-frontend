import * as actionTypes from './actions/actionTypes';

const initialState = {
    isLoggedIn : false,
    userId : '',
    token : '',
    loading : false,
    userName : '',
    error : null,
};

const reducer = (state = initialState , action) => {

    switch(action.type) {
        case actionTypes.AUTH_START : {
            return {
                ...state,
                loading : true,
                error : null,
            };
        };
        case actionTypes.AUTH_SUCCESS : {
            return {
                ...state,
                loading : false,
                isLoggedIn : true,
                userId : action.userId,
                token : action.token,
                userName : action.userName,
                error : null,
            };
        };
        case actionTypes.AUTH_FAIL : {
            return {
                ...state,
                error : action.error.message,
                loading : false,
            }
        };
        case actionTypes.LOGOUT : {
            return initialState;
        };
        case actionTypes.LOGIN : {
            return {
                ...state,
                isLoggedIn : true,
                userName : action.userName,
                userId : action.userId,
                error : null,
            }
        }
    };
    return state;
};


export default reducer;