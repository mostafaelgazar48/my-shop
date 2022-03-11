const express = require('express');
const {loginUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser} = require("../controllers/UserController");
const {protect, admin} = require("../middleware/authMiddleware");
const router = express.Router();

router.post('/login',loginUser);
router.get('/profile',protect,getUserProfile);
router.get('/',protect,admin,getUsers);

router.put('/profile',protect,updateUserProfile);
router.post('/',registerUser);
router.delete('/:id',protect,admin,deleteUser)
router.get('/:id',protect,admin,getUserById)
router.put('/:id',protect,admin,updateUser)


module.exports = router;