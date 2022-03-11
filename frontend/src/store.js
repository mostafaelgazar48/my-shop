import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    addReviewReducer,
    createProductReducer,
    deleteProductReducers, getTopProductsReducer,
    productReducers,
    updateProductReducer
} from "./redux/products/productReducers";
import { productsDetailsReducer } from "./redux/product-details/productsDetailsReducer";
import { cartReducer } from "./redux/cart/cartReducer";
import {
    userDeleteReducer,
    userDetailsReducer,
    userLoginReducer,
    userRegisterReducer,
    usersListReducer,
    userUpdateProfileReducer,
    userUpdateReducer
} from "./redux/user/userReducers";
import {
    createOrderReducer, orderDeliverReducer,
    orderDetailsReducer,
    orderPayReducer,
    ordersListReducer,
    userOrdersReducer
} from "./redux/orders/orderReducers";


const reducer = combineReducers({
    productsList: productReducers,
    productDetails: productsDetailsReducer,
    productDelete:deleteProductReducers,
    productCreate:createProductReducer,
    productUpdate:updateProductReducer,
    topProducts:getTopProductsReducer,
    addReview:addReviewReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    usersList: usersListReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: createOrderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver:orderDeliverReducer,
    ordersList:ordersListReducer,
    userOrders: userOrdersReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer
});
const localStorageItem = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const localStorageUser = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];
const localStorageShippingAddress = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : [];



const initialState = {
    cart: { cartItems: localStorageItem, shippingAddress: localStorageShippingAddress },
    userLogin: { userData: localStorageUser }
};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;