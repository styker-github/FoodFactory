const express = require('express');
const router = express.Router();

const IngredientController = require('../controllers/IngredientController')

// Ingredient
router.post('/create',IngredientController.createIngredient)
router.post('/update',IngredientController.updateIngredient)
router.get('/detail',IngredientController.getIngredient)
router.get('/list',IngredientController.ingredientList)
router.post('/delete',IngredientController.deleteIngredient)
router.get('/threshold',IngredientController.ingredientThreshold)
router.get('/vendor',IngredientController.vendorIngredients)

module.exports = router