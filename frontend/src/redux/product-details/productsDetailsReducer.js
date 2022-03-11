
import {PRODUCT_DETAILS_FAILED,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS} from "./productDetailsConstants";


export const productsDetailsReducer = (state = { product: {reviews:[]} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true, ...state}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAILED:
            return {loading: false, error: action.payload}
        default :
            return state
    }

}