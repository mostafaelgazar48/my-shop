const express = require('express');
const router = express.Router();
const {admin,protect} = require('../middleware/authMiddleware')
const {getProductById,getProducts, deleteProduct, createProduct, updateProduct, addReview, getTopProducts} = require("../controllers/ProductController");

/*
* @desc  Fetch All  Products
*@route  /api/products
* @access public
* */
router.get('/', getProducts);
router.get('/top', getTopProducts);

router.post('/',protect,admin,createProduct);
router.post('/:id/review',protect,addReview)

/*
* @desc  Fetch single  Products
* @route  /api/products/:id
* @access public
* */

router.get('/:id', getProductById)

router.delete('/:id',protect,admin,deleteProduct)
router.put('/:id',protect,admin,updateProduct)

module.exports = router;