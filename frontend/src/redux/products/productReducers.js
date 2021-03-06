import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAILED,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAILED,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAILED,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAILED,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAILED,
    PRODUCT_CREATE_REVIEW_RESET, PRODUCTS_TOP_FAILED, PRODUCTS_TOP_SUCCESS, PRODUCTS_TOP_REQUEST
} from "./productConstants";

export const productReducers = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                page: action.payload.page,
                pages: action.payload.pages
            }
        case PRODUCT_LIST_FAILED:
            return {loading: false, error: action.payload}
        default :
            return state
    }

}


export const deleteProductReducers = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {loading: true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_DELETE_FAILED:
            return {loading: false, error: action.payload}
        default :
            return state
    }

}

export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                product: action.payload,

            }
        case PRODUCT_CREATE_FAILED:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        default :
            return state
    }

}

export const updateProductReducer = (state = {product: {}}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {loading: true}
        case PRODUCT_UPDATE_SUCCESS:
            return {loading: false, success: true, product: action.payload}
        case PRODUCT_UPDATE_FAILED:
            return {loading: false, error: action.payload}
        case PRODUCT_UPDATE_RESET:
            return {product: {}}
        default :
            return state
    }

}


export const addReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading: true}
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_CREATE_REVIEW_FAILED:
            return {loading: false, error: action.payload}
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default :
            return state
    }

}

export const getTopProductsReducer = (state = {products:[]}, action) => {
    switch (action.type) {
        case PRODUCTS_TOP_REQUEST:
            return {loading: true}
        case PRODUCTS_TOP_SUCCESS:
            return {loading: false, products:action.payload}
        case PRODUCTS_TOP_FAILED:
            return {loading: false, error: action.payload}
        default :
            return state
    }

}