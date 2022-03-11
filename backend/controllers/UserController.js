const asyncHandler = require("express-async-handler");
const User = require('../models/userModel')
const {generateJwt} = require("../utils/generateJwt");
const loginUser = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if (user && await user.validPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateJwt(user._id)
        })
    } else {
        res.status(401);
        throw new Error(' Sorry you are not authorized')
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404);
        throw new Error('user not found');
    }

});
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
        res.status(400);
        throw new Error('user already Exist')
    } else {
        const user = await User.create({
            name, email, password
        })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateJwt(user._id)
        })
    }

});

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name||user.name;
        user.email =req.body.email || user.email;
        if (req.body.password){
            user.password = req.password;
        }

        const updatedUser = await user.save();
     if(updatedUser){
         res.json({
             _id: updatedUser._id,
             name: updatedUser.name,
             email: updatedUser.email,
             isAdmin: updatedUser.isAdmin,
             token: generateJwt(updatedUser._id)
         })
     }

    } else {
        res.status(404);
        throw new Error('user not found');
    }

});



const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});

    if (users) {
        res.json(users)
    } else {
        res.status(404);
        throw new Error('users not found');
    }

});


const deleteUser = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);

    if (user) {
        user.remove()
        res.json({message:'user deleted'})
    } else {
        res.status(404);
        throw new Error('user not found');
    }

});

const getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id).select('-password')

    if (user) {
        res.json({user})
    } else {
        res.status(404);
        throw new Error('user not found');
    }

});



const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name||user.name;
        user.email =req.body.email || user.email;
        user.isAdmin =req.body.isAdmin

        const updatedUser = await user.save();
     if(updatedUser){
         res.json({
             _id: updatedUser._id,
             name: updatedUser.name,
             email: updatedUser.email,
             isAdmin: updatedUser.isAdmin,
         })
     }

    } else {
        res.status(404);
        throw new Error('user not found');
    }

});


module.exports = {
    loginUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}