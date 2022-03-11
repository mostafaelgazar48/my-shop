import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAILED,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAILED,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILED,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAILED, USER_DETAILS_RESET, USERS_LIST_REQUEST, USERS_LIST_SUCCESS, USERS_LIST_FAILED, USERS_LIST_RESET, USERS_DELETE_REQUEST, USERS_DELETE_SUCCESS, USERS_DELETE_FAILED, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAILED, USER_EDIT_RESET
} from "./userConstants";


export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true }
        case USER_LOGIN_SUCCESS:
            return { loading: false, userData: action.payload }
        case USER_LOGIN_FAILED:
            return { loading: false, error: action.payload }
        case USER_LOGOUT:
            return {}
        default:
            return state
    }

}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true }
        case USER_REGISTER_SUCCESS:
            return { loading: false, userData: action.payload }
        case USER_REGISTER_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }

}


export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAILS_RESET:
            return { user: {} }
        case USER_DETAILS_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }

}



export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_PROFILE_REQUEST:
            return { ...state, loading: true }
        case USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true, user: action.payload }
        case USER_UPDATE_PROFILE_FAILED:
            return { loading: false, error: action.payload }
        default:
            return state
    }

}


export const usersListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USERS_LIST_REQUEST:
            return { loading: true }
        case USERS_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case USERS_LIST_FAILED:
            return { loading: false, error: action.payload }
        case USERS_LIST_RESET:
            return {users:[]}
        default :
            return state
    }
}



export const userDeleteReducer = (state = { }, action) => {
    switch (action.type) {
        case USERS_DELETE_REQUEST:
            return { loading: true }
        case USERS_DELETE_SUCCESS:
            return { loading: false, success:true }
        case USERS_DELETE_FAILED:
            return { loading: false, error: action.payload }
        default :
            return state
    }
}





export const userUpdateReducer = (state = { user:{} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: false, success:true }
        case USER_UPDATE_FAILED:
            return { loading: false, error: action.payload }
        case USER_EDIT_RESET:
            return {user:{}}
        default :
            return state
    }
}