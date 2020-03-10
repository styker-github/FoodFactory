const express = require('express');
const router = express.Router();

const OrderController = require('./../controllers/OrderController')

// orders
router.post('/newOrder',OrderController.createOrder)
router.get('/list',OrderController.orderList)
router.post('/status',OrderController.updateOrderStatus)
router.post('/userOrders',OrderController.getCustomerOrders)

module.exports = router