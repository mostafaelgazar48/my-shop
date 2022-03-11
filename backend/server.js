const express = require('express');
const dotenv=  require('dotenv')
const products = require("./data/products");
const productRouters= require('./routes/productRoutes');
const userRouters = require('./routes/usersRoutes');
const orderRouters = require('./routes/orderRoutes');

dotenv.config();
 require('./config/db')
const {notFound, errorHandler} = require("./middleware/errorHandler");

const app =  express()
app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/products',productRouters);
app.use('/api/users',userRouters);
app.use('/api/orders',orderRouters);

app.use('/api/config/paypalid',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID);
})


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT,console.log('server is runnuing N PORT '+PORT))