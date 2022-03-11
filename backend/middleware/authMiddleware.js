const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const User = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select('-password');
            next();
        } catch (e) {
            console.error(e);
            res.status(401);
            throw new Error('You are not authorization');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Your are not authorized');
    }
})

const admin = asyncHandler(async (req,res,next)=>{
    if(req.user && req.user.isAdmin){
      return next()
    }
    res.status(401)
    throw new Error('you are not recognized as admin')
})

module.exports = {
    protect,admin
}