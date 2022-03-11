const asyncHandler = require("express-async-handler");
const Product = require('../models/productModel')
const {param} = require("express/lib/router");


/*
* @desc  Fetch All  Products
*@route  /api/products
* @access public
* */
const getProducts = asyncHandler(async (req, res) => {
    const pageSize= 8
    const page = Number(req.query.pageNumber) ||1
    const query = req.query.q ?{
        name:{
            $regex:req.query.q,
            $options:'i'
        }
    }:{}
    const productsCount = await Product.countDocuments({...query})

    const products = await Product.find({...query}).limit(pageSize).skip(pageSize*(page-1));
    // throw new Error('not allowed')
    res.json({products,page,pages:Math.ceil(productsCount/pageSize)});
})


/*
* @desc  Fetch single  Products
* @route  /api/products/:id
* @access public
* */

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById({_id: req.params.id});
    if (product) {
        res.json(product)
    } else {
        res.status(404);
        throw new Error('product not found')
    }

})


/*
* @desc  FDelete product
* @route  /api/products/:id
* @access private
* */

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById({_id: req.params.id});
    if (product) {
        product.remove()
        res.json({message: 'deleted succesfully'})

    } else {
        res.status(404);
        throw new Error('product not found')
    }

})


/*
* @desc  Create Product
* @route POST  /api/products
* @access private
* */

const createProduct = asyncHandler(async (req, res) => {
    const product = await new Product({
        name: 'iphone',
        price: 10,
        user: req.user._id,
        image: '/images/default.jpg',
        brand: 'default',
        category: 'sample',
        countInStock: 0,
        numReviews: 0,
        description: 'bla bla'
    })

    const created = await product.save();

    if (created) {
        return res.status(201).json(product);
    }

    throw new Error('failed to create product')


})


/*
* @desc  update Product
* @route PUT  /api/products/:ID
* @access private
* */

const updateProduct = asyncHandler(async (req, res) => {

    const {name, price, description, image, brand, category, countInStock} = req.body;
    const product  =await Product.findById(req.params.id);
    if(product){
        product.name=name ||product.name;
        product.price = price||  product.price;
        product.description = description ||  product.description;
        product.image = image ||   product.image;
        product.countInStock = countInStock ||  product.countInStock ;
        product.brand =brand|| product.brand;
        product.category = category || product.category;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    }else {
        res.status(404);
        throw new Error('Product not found')
    }

});




/*
* @desc  add review to a Product
* @route PUT  /api/products/:ID/review
* @access private
* */

const addReview =asyncHandler(async (req,res)=>{

    const {rating,comment} = req.body;
    const product = await  Product.findById(req.params.id)

    if(product){
        const reviewed =  product.reviews.find((r)=> r.user.toString() === req.user._id.toString())
        if(reviewed){
            res.status(400);
            throw new Error('Product reviewed before')
        }

        const reviewBody={
            rating:Number(rating),
            comment:comment,
            name:req.user.name,
            user:req.user._id
        }

        product.reviews.push(reviewBody)
        product.numReviews=product.reviews.length;
        product.rating= product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length;
        await product.save();
        res.status(201).json({message:'reviewed successfully'})
    }else {
        res.status(404);
        throw new Error('Product not found')
    }

})


const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating:-1}).limit(3);
    res.json(products)

})




module.exports = {
    getProducts,
    deleteProduct,
    getProductById,
    createProduct,
    updateProduct,
    addReview,
    getTopProducts
}