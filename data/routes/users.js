const express = require('express');
const router = express.Router();


const UserController = require('./../controllers/UserController')

// User routes
router.post('/signup',UserController.userSignup)
router.post('/login',UserController.userLogin)
router.post('/changePassword',UserController.changePassword)
router.post('/resetPassword',UserController.resetPassword)
router.post('/deactivate',UserController.deactivateUser)
router.post('/update',UserController.updateUser)
router.post('/userdetail',UserController.getUser)
router.get('/list',UserController.userList)
router.post('/delete',UserController.deleteUser)

module.exports = router