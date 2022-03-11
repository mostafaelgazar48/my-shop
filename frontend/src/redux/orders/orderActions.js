
import {
    ORDER_CREATE_FAILED,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_FAILED,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAILED,
    USER_ORDER_REQUEST,
    USER_ORDER_SUCCESS,
    USER_ORDER_FAILED,
    ORDERS_LIST_REQUEST,
    ORDERS_LIST_SUCCESS,
    ORDERS_LIST_FAILED,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAILED
} from "./orderConstants";
import {USERS_LIST_FAILED, USERS_LIST_REQUEST, USERS_LIST_SUCCESS} from "../user/userConstants";


export const createOrder = (order) =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_CREATE_REQUEST
            })

            const {userLogin: {userData}} = getState();
            const response = await fetch(`/api/orders`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
                method: 'POST',
                body: JSON.stringify(order)
            })
            const data = await response.json();
            dispatch({
                type: ORDER_CREATE_SUCCESS,
                payload: data
            })
        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }

export const getOrderDetails = (id) =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_DETAILS_REQUEST
            })

            const {userLogin: {userData}} = getState();
            const response = await fetch(`/api/orders/${id}`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                },
                method: 'GET',
            })
            const data = await response.json();
            console.log(data)
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload:data
            })
        } catch (error) {
            dispatch({
                type: ORDER_DETAILS_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }




export const payOrder = (id,paymentResult) =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_PAY_REQUEST
            })

            const {userLogin: {userData}} = getState();
            const response = await fetch(`/api/orders/${id}/pay`, {
                headers: {
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${userData.token}`
                },
                method: 'PUT',
                data:JSON.stringify(paymentResult)
            })
            const data = await response.json();

            dispatch({
                type: ORDER_PAY_SUCCESS,
                payload:  data
            })
        } catch (error) {
            dispatch({
                type: ORDER_PAY_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }





export const listUserOrders = () =>
async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_ORDER_REQUEST
        })

        const {userLogin: {userData}} = getState();
        //console.log(userData.token);
        const response = await fetch(`/api/orders/myorders`, {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        })
        const data = await response.json();

        dispatch({
            type: USER_ORDER_SUCCESS,
            payload:  data
        })
    } catch (error) {
        //let error = await err;
        dispatch({
            type: USER_ORDER_FAILED,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}



export const listOrders = () =>
    async (dispatch,getState) => {
        try {
            const { userLogin:{userData} } = getState();

            dispatch({
                type: ORDERS_LIST_REQUEST
            })
            const response = await fetch(`/api/orders`, {
                headers: {
                    Authorization:`Bearer ${userData.token}`
                }
            })

            const data= await response.json();
            dispatch({
                type: ORDERS_LIST_SUCCESS,
                payload: data
            })


        } catch (error) {
            dispatch({
                type: ORDERS_LIST_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }




export const deliverOrder = (order) =>
    async (dispatch, getState) => {
        try {
            dispatch({
                type: ORDER_DELIVER_REQUEST
            })

            const {userLogin: {userData}} = getState();
            const response = await fetch(`/api/orders/${order._id}/deliver`, {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                },
                method: 'PUT',
            })
            const data = await response.json();

            dispatch({
                type: ORDER_DELIVER_SUCCESS,
                payload:  data
            })
        } catch (error) {
            dispatch({
                type: ORDER_DELIVER_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }



