import {PRODUCT_DETAILS_FAILED,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_REQUEST} from "./productDetailsConstants";

export const getSingleProduct = (id) =>
    async (dispatch) => {

        try {
            dispatch({
                type: PRODUCT_DETAILS_REQUEST
            })
            const response = await fetch(`/api/products/${id}`);
            const data =await response.json()
            dispatch({
                type: PRODUCT_DETAILS_SUCCESS,
                payload: data
            });
        } catch (error) {
            dispatch({
                type: PRODUCT_DETAILS_FAILED,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            })
        }
    }