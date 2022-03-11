const asyncHandler = require("express-async-handler");
const Order = require('../models/orderModel')


/*
* @desc Create orders
* @route POST /api/order
* @access private
* */


const createOrderItem = asyncHandler(async (req, res) => {

    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        taxPrice,
        itemsPrice,
        totalPrice,
        shippingPrice

    } = req.body;


    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw  new Error(' Items are Empty')
        return
    } else {
         const order  =  await  new Order({
             user:req.user._id,
             orderItems,
             shippingAddress,
             paymentMethod,
             taxPrice,
             itemsPrice,
             totalPrice,
             shippingPrice
         });
         const createdOrder =  await  order.save();
         res.status(201).json(createdOrder);
    }

})

/*
* @desc get order by id
* @route get /api/orders/:id
* @access private
* */
const getOrderById = asyncHandler(async (req,res) =>{
    const id = req.params.id ;
    const order = await Order.findById(id).populate('user','name email');
    if (order){
        res.json(order);
    }else {
        res.status(404);
        throw  new Error(' Order not found');
        }
})


/*
* @desc pay orders
* @route POST /api/orders/:id/pay
* @access private
* */
const orderPay = asyncHandler(async (req,res) =>{
    const id = req.params.id ;
    const order = await Order.findById(id);
    if (order){
    order.paidAt =Date.now();
    order.isPaid = true;
    order.paymentResult = {
        id: req.body.id,
        status:req.body.status,
        email_address:req.body.payer.email_address,
        update_time: req.body.update_time
    }

    const paidOrder = await order.save();
    res.json(paidOrder);
    }else {
        res.status(404);
        throw  new Error(' Order not found');
    }
})


/*
* @desc get logged in user orders
* @route get /api/orders/myorders
* @access private
* */
const getUserOrder = asyncHandler(async (req,res) =>{
    const orders = await Order.find({user:req.user._id})
    if (orders){
        res.json(orders);
    }else {
        res.status(404);
        throw  new Error(' Orders not found');
        }
})




/*
* @desc get logged in user orders
* @route get /api/orders/myorders
* @access private
* */
const getOrders = asyncHandler(async (req,res) =>{
    const orders = await Order.find({}).populate('user','id name')
    if (orders){
        res.json(orders);
    }else {
        res.status(404);
        throw  new Error(' Orders not found');
    }
})


/*
* @desc pay orders
* @route POST /api/orders/:id/pay
* @access private
* */
const updateOrderToDelivered = asyncHandler(async (req,res) =>{
    const id = req.params.id ;
    const order = await Order.findById(id);
    if (order){
        order.deliveredAt =Date.now();
        order.isDelivered = true;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }else {
        res.status(404);
        throw  new Error(' Order not found');
    }
})



module.exports ={
    createOrderItem,
    getOrderById,
    orderPay,
    getUserOrder,
    getOrders,
    updateOrderToDelivered
}