import { USER_ORDER_RESET } from "../orders/orderConstants";
import {
    USERS_DELETE_FAILED,
    USERS_DELETE_REQUEST,
    USERS_DELETE_SUCCESS,
    USERS_LIST_FAILED,
    USERS_LIST_REQUEST,
    USERS_LIST_RESET,
    USERS_LIST_SUCCESS,
    USER_DETAILS_FAILED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_RESET,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAILED,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAILED,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_FAILED,
    USER_UPDATE_PROFILE_FAILED,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS
} from "./userConstants";

export const login = (email, password) =>
    async (dispatch) => {
        try {
            dispatch({
                type: USER_LOGIN_REQUEST
            })

    
            const response = await fetch('/api/users/login', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body:JSON.stringify({
                    email,
                    password
                })
            })

            const data= await response.json();
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }

    export const logout= () =>
        (dispatch)=>{
        localStorage.removeItem('userData');
        dispatch({
            type:USER_LOGOUT
        })

        dispatch({
            type:USER_DETAILS_RESET
        })

        dispatch({
            type:USER_ORDER_RESET
        })
        dispatch({type:USERS_LIST_RESET})
        }




export const register = (name,email, password) =>
    async (dispatch) => {
        try {
            dispatch({
                type: USER_REGISTER_REQUEST
            })

    
            const response = await fetch('/api/users', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body:JSON.stringify({
                    name,
                    email,
                    password
                })
            })

            const data= await response.json();
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: data
            })
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
            localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }



export const getUserDetails = (id) =>
async (dispatch,getState) => {
        try {
            const { userLogin:{userData} } = getState();

            dispatch({
                type: USER_DETAILS_REQUEST
            })

            const response = await fetch(`/api/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userData.token}`
                }
            })

            const data= await response.json();
            dispatch({
                type: USER_DETAILS_SUCCESS,
                payload: data
            })

            localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: USER_DETAILS_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }


export const updateUserProfile = (user) =>
    async (dispatch,getState) => {
        try {
            const { userLogin:{userData} } = getState();

            dispatch({
                type: USER_UPDATE_PROFILE_REQUEST
            })
            const response = await fetch(`/api/users/profile`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userData.token}`
                },
                method:'PUT',
                body:JSON.stringify(user)
            })

            const data= await response.json();
            dispatch({
                type: USER_UPDATE_PROFILE_SUCCESS,
                payload: data
            })

            localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: USER_UPDATE_PROFILE_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }



export const listUsers = () =>
async (dispatch,getState) => {
    try {
        const { userLogin:{userData} } = getState();

        dispatch({
            type: USERS_LIST_REQUEST
        })
        const response = await fetch(`/api/users`, {
            headers: {
                Authorization:`Bearer ${userData.token}`
            }
        })

        const data= await response.json();
        dispatch({
            type: USERS_LIST_SUCCESS,
            payload: data
        })

    
    } catch (error) {
        dispatch({
            type: USERS_LIST_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}


export const deleteUser = (id) =>
async (dispatch,getState) => {
        try {
            const { userLogin:{userData} } = getState();

            dispatch({
                type: USERS_DELETE_REQUEST
            })

            const response = await fetch(`/api/users/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userData.token}`
                },
                method:'DELETE'
            })
                await response.json();
            dispatch({
                type: USERS_DELETE_SUCCESS,
            })

            //localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: USERS_DELETE_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }


    export const updateUser = (user) =>
async (dispatch,getState) => {
        try {
            const { userLogin:{userData} } = getState();

            dispatch({
                type: USER_UPDATE_REQUEST
            })

            const response = await fetch(`/api/users/${user._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userData.token}`
                },
                method:'PUT',
                body:JSON.stringify(user)
            })
          const data =  await response.json();
            dispatch({
                type: USER_UPDATE_SUCCESS,
            })

            dispatch({
                type: USER_DETAILS_SUCCESS,payload:data
            })

            

            //localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: USER_UPDATE_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }


