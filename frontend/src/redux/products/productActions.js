import {
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILED,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILED,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAILED,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAILED, PRODUCTS_TOP_REQUEST, PRODUCTS_TOP_SUCCESS, PRODUCTS_TOP_FAILED
} from "./productConstants";


export const getProducts = (keyword='',pageNumber='') =>
    async (dispatch) => {
        try {
            dispatch({
                type: PRODUCT_LIST_REQUEST
            })
            const response = await fetch(`/api/products?q=${keyword}&pageNumber=${pageNumber}`);
            const data =await response.json()
            dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_LIST_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }




export const deleteProduct = (id) =>
async (dispatch,getState) => {
        try {
            const { userLogin:{userData} } = getState();

            dispatch({
                type: PRODUCT_DELETE_REQUEST
            })

            const response = await fetch(`/api/products/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userData.token}`
                },
                method:'DELETE'
            })
                await response.json();
            dispatch({
                type: PRODUCT_DELETE_SUCCESS,
            })

            //localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: PRODUCT_DELETE_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }




export const createProduct = () =>
    async (dispatch,getState) => {
        try {
            const { userLogin:{userData} } = getState();

            dispatch({
                type: PRODUCT_CREATE_REQUEST
            })

            const response = await fetch(`/api/products`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userData.token}`
                },
                method:'POST'
            })
            const data=await response.json();
            dispatch({
                type: PRODUCT_CREATE_SUCCESS,
                payload:data
            })

            //localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: PRODUCT_CREATE_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }



export const updateProduct = (product) =>
    async (dispatch,getState) => {
        try {
            const { userLogin:{userData} } = getState();

            dispatch({
                type: PRODUCT_UPDATE_REQUEST
            })

            const response = await fetch(`/api/products/${product._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userData.token}`
                },body:JSON.stringify(product),
                method:'PUT'
            })
            const data=await response.json();
            dispatch({
                type: PRODUCT_UPDATE_SUCCESS,
                payload:data
            })

            //localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: PRODUCT_UPDATE_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }


export const createProductReview = (id,review) =>
    async (dispatch,getState) => {
        try {
            const { userLogin:{userData} } = getState();

            dispatch({
                type: PRODUCT_CREATE_REVIEW_REQUEST
            })

            const response = await fetch(`/api/products/${id}/review`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:`Bearer ${userData.token}`
                },body:JSON.stringify(review),
                method:'POST'
            })
            await response.json();
            dispatch({
                type: PRODUCT_CREATE_REVIEW_SUCCESS,
            })

            //localStorage.setItem('userData', JSON.stringify(data))
        } catch (error) {
            dispatch({
                type: PRODUCT_CREATE_REVIEW_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }


export const getTopProducts = () =>
    async (dispatch) => {
        try {
            dispatch({
                type: PRODUCTS_TOP_REQUEST
            })
            const response = await fetch(`/api/products/top`);
            const data =await response.json()
            dispatch({
                type: PRODUCTS_TOP_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: PRODUCTS_TOP_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }