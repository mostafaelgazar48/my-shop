import {ADD_CART_ITEM, REMOVE_CART_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS} from "./cartConstants";

export const cartReducer= (state ={cartItems:[] ,shippingAddress:{}},action)=>{
    switch (action.type){
        case ADD_CART_ITEM:
            const item =  action.payload;
            const existingItem =  state.cartItems.find(x=>x.product ===item.product);
            if(existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>x.product ===existingItem.product ?item :x)
                }
            }else{
                return {
                    ...state,
                    cartItems: [...state.cartItems,item]
                }
            }
        case REMOVE_CART_ITEM :
            return {
                ...state,
                cartItems: state.cartItems.filter((item) =>item.product !== action.payload)
            }
        case SAVE_SHIPPING_ADDRESS:
            return  {
                ...state,
                shippingAddress:action.payload
            }
        case SAVE_PAYMENT_METHOD:
            return  {
                ...state,
                paymentMethod:action.payload
            }
        default :
            return state
    }
}