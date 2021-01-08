import * as actionTypes from './actionTypes';
import axios from 'axios';

const key = 'AIzaSyCVz2vRu89plkYg7j_PRP9vO2T08-QkKmY';

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START,
    };
};

export const authSuccess = (token,userId,userName) => {
    return {
        type : actionTypes.AUTH_SUCCESS,
        token : token,
        userId : userId,
        userName : userName,
    };
};

export const authFail = (error) => {
    return {
        type : actionTypes.AUTH_FAIL,
        error : error,
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type : actionTypes.LOGOUT,
    };
};


export const asyncLogout = (timeInSeconds) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },timeInSeconds*1000);
    }
}

export const LoginUser = (userName,userId) => {
    return {
        type : actionTypes.LOGIN,
        userName : userName,
        userId : userId,
    }
}

export const auth = (email,password,userName,signUp) => {
    return  dispatch =>{
        dispatch(authStart());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + key;
        if(signUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+key;
        }
        axios.post(url,{
            email : email,
            password : password,
            returnSecureToken : true,
        }).then((resp) => {
            localStorage.setItem('token',resp.data.idToken);
            localStorage.setItem('userId',resp.data.localId);
            localStorage.setItem('expirationDate',new Date(new Date().getTime() + resp.data.expiresIn*1000));
            dispatch(authSuccess(resp.data.idToken,resp.data.localId,userName));
            dispatch(asyncLogout(resp.data.expiresIn));
            if(!signUp){
                axios.get('http://localhost:8080/get-info/'+resp.data.localId+'/'+ userName).then((resp) => {
                    console.log(resp);
                    const userData = resp.data;
                    localStorage.setItem('userName',userData.name);
                    dispatch(LoginUser(userData.name,userData.userId));
                })
            }
            else {
                localStorage.setItem('userName',userName);
                axios.post('http://localhost:8080/create-user',{
                    userId : resp.data.localId,
                    name : userName,
                });
            }
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};


export const defaultLogin = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    return dispatch => {
        if(!token){
            dispatch(logout());
        }
        else if(new Date(localStorage.getItem('expirationDate')) > new Date()){
            dispatch(authSuccess(token,userId,userName));
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            dispatch(asyncLogout((expirationDate.getTime()- new Date().getTime())/1000));
        }
        else {
            dispatch(logout());
        }
    }
}