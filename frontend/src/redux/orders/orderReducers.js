import {
    ORDER_CREATE_FAILED,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS, ORDER_DELIVER_FAILED, ORDER_DELIVER_REQUEST, ORDER_DELIVER_RESET, ORDER_DELIVER_SUCCESS,
    ORDER_DETAILS_FAILED,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS, ORDER_PAY_FAILED,
    ORDER_PAY_REQUEST, ORDER_PAY_RESET,
    ORDER_PAY_SUCCESS, ORDERS_LIST_FAILED, ORDERS_LIST_REQUEST, ORDERS_LIST_RESET, ORDERS_LIST_SUCCESS,
    USER_ORDER_FAILED,
    USER_ORDER_REQUEST,
    USER_ORDER_RESET,
    USER_ORDER_SUCCESS
} from "../orders/orderConstants";
import {USERS_LIST_FAILED, USERS_LIST_REQUEST, USERS_LIST_RESET, USERS_LIST_SUCCESS} from "../user/userConstants";

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {loading: true}
        case ORDER_CREATE_SUCCESS:
            return {loading: false, success: true, order: action.payload}
        case ORDER_CREATE_FAILED:
            return {loading: false, error: action.payload}
        default :
            return state
    }

}


export const orderDetailsReducer = (state = {loading:true, oderItems:[],shippingAddress:{}}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {...state, loading: true}
        case ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload}
        case ORDER_DETAILS_FAILED:
            return {loading: false, error: action.payload}
        default :
            return state
    }

}



export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {loading: true}
        case ORDER_PAY_SUCCESS:
            return {loading: false,success:true}
        case ORDER_PAY_FAILED:
            return {loading: false, error: action.payload}
        case ORDER_PAY_RESET:
            return {}
        default :
            return state
    }

}


export const userOrdersReducer = (state = {orders:[]}, action) => {
    switch (action.type) {
        case USER_ORDER_REQUEST:
            return {loading: true}
        case USER_ORDER_SUCCESS:
            return {loading: false,success:true,orders:action.payload}
        case USER_ORDER_RESET:
            return {orders:[]}
        case USER_ORDER_FAILED:
            return {loading: false, error: action.payload}
        default :
            return state
    }

}

export const ordersListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDERS_LIST_REQUEST:
            return { loading: true }
        case ORDERS_LIST_SUCCESS:
            return { loading: false, orders: action.payload }
        case ORDERS_LIST_FAILED:
            return { loading: false, error: action.payload }
        case ORDERS_LIST_RESET:
            return {orders:[]}
        default :
            return state
    }
}



export const orderDeliverReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {loading: true}
        case ORDER_DELIVER_SUCCESS:
            return {loading: false,success:true}
        case ORDER_DELIVER_FAILED:
            return {loading: false, error: action.payload}
        case ORDER_DELIVER_RESET:
            return {}
        default :
            return state
    }

}
