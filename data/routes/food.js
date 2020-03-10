const express = require('express');
const router = express.Router();


const FoodController = require('../controllers/FoodController')


// Food
router.post('/create',FoodController.createFood)
router.post('/update',FoodController.updateFood)
router.get('/detail',FoodController.getFood)
router.get('/list',FoodController.foodList)
router.post('/delete',FoodController.deleteFood)
router.get('/cost',FoodController.foodCostMeasure)

module.exports = router