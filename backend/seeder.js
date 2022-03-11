const mongoose = require('mongoose')
const User = require('./models/userModel')
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const users = require('./data/users')
const products = require('./data/products')
const dotenv = require('dotenv');
dotenv.config()
require('./config/db');

const seed = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany()

        const createdUsers = await User.insertMany(users);
        const admin= createdUsers[1]._id;
        const productList =products.map(product =>{
            return {...product,user:admin}
        })
        await Product.insertMany(productList)

        console.log('data seeded successfully ');
        process.exit();

    } catch (err) {
        console.log(err.message);
        process.exit(1)
    }

}


const removeData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany()
        console.log('data deleted successfully')
    } catch (err) {
        console.log(err.message);
        process.exit(1)
    }

}

if(process.argv ==='-d'){
    removeData();
}else {
    seed()
}

