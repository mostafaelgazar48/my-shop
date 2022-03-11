const express =  require('express');
const {createOrderItem, getOrderById, orderPay, getUserOrder, getOrders, updateOrderToDelivered} = require("../controllers/OrderController");
const {protect, admin} = require("../middleware/authMiddleware");
const router = express.Router();


router.post('/',protect,createOrderItem);
router.get('/',protect,admin,getOrders);

router.get('/myorders',protect,getUserOrder);

router.get('/:id',protect,getOrderById);
router.put('/:id/pay',protect,orderPay);
router.put('/:id/deliver',protect,admin,updateOrderToDelivered);




module.exports = router;
   