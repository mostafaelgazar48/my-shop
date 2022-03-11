    import {ADD_CART_ITEM, REMOVE_CART_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS} from "./cartConstants";
export const addToCart=(id,qty)=>
    async (dispatch,getState)=>{
        const response = await fetch(`/api/products/${id}`);
        const data =await response.json()
        dispatch({
            type:ADD_CART_ITEM,
            payload:{
                product:data._id,
                name:data.name,
                image:data.image,
                price:data.price,
                countInStock:data.countInStock,
                qty
            }
        })
        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
    }

    export const removeCartItem = (id)=>
        async (dispatch,getState)=>{
            dispatch({
                type:REMOVE_CART_ITEM,
                payload:id
            })
            localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
        }

    export const saveShippingAddress = (data)=>
        async (dispatch)=>{
            dispatch({
                type:SAVE_SHIPPING_ADDRESS,
                payload:data
            })
            localStorage.setItem('shippingAddress',JSON.stringify(data))
        }


    export const savePaymentMethod = (data)=>
        async (dispatch)=>{
            dispatch({
                type:SAVE_PAYMENT_METHOD,
                payload:data
            })
            localStorage.setItem('paymentMethod',JSON.stringify(data))
        }