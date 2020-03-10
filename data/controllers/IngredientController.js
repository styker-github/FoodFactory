const Ingredient = require('../models/Ingredient')

// Create Ingredient
const createIngredient = async function(req,res){
    console.log('createIngredient',req.body)

    let isValidParams = req.body.name && req.body.price && req.body.lotnumber && req.body.vendorName
    
    if(isValidParams){
        try {
            let findIngredient = await Ingredient.findOne({lotnumber:req.body.lotnumber})
            if(findIngredient){
                res.send({success:false,message:"Lot number already exist"})
            }else{
                let newIngredient = await Ingredient.create({
                    name: req.body.name,
                    lotnumber: req.body.lotnumber,
                    availableQuantity: req.body.availableQuantity,
                    thresholdQuantity:req.body.thresholdQuantity,
                    price:req.body.price,
                    vendorName:req.body.vendorName,
                    vendorEmail:req.body.vendorEmail
                }).then((ingredient)=>{
                    res.send({success:true,message:'Ingredient created successfully',ingredient})
                })
            }
        }catch (e) {
            console.log('Error occured in createIngredient',err)
            res.send({success:false,message:'Error occured while creating new Ingredient'})
        }
    }else{
        res.send({success:false,message:"Please provide the required parameters to create ingredient"})
    }
}

const updateIngredient = async function(req,res){
    console.log('updateIngredient',req.body)

    try {
        let findIngredient = await Ingredient.findOne({lotnumber:req.body.lotnumber})
        if(findIngredient){
            let getIngredient = await Ingredient.findOne({_id:findIngredient._id}).then(async(data)=>{
                let editIngredient = await Ingredient.updateOne({_id:data._id},{$set:{
                    name: req.body.name?req.body.name:data.name,
                    availableQuantity: req.body.availableQuantity?req.body.availableQuantity:data.availableQuantity,
                    thresholdQuantity:req.body.thresholdQuantity?req.body.thresholdQuantity:data.thresholdQuantity,
                    price:req.body.price?req.body.price:data.price,
                    vendorName:req.body.vendorName?req.body.vendorName:data.vendorName,
                    vendorEmail:req.body.vendorEmail?req.body.vendorEmail:data.vendorEmail
                }})
            }).then(()=>{
                res.send({success:true,message:'Ingredient updated successfully'})
            })
        }else{
            res.send({success:false,message:"Ingredient not found"})
        }
    }catch (e) {
        console.log('Error in updateIngredient',e)
        res.send({success:false,message:'Error occured while updating ingredient'})
    }
    
}

const getIngredient = async function(req,res){
    console.log('getIngredient',req.query)

    let findIngredient = await Ingredient.findOne({lotnumber:req.query.lotnumber}).then((data)=>{
        if(data){
            res.send({success:true,ingredient:data})
        }else{
            res.send({success:false,message:'No Ingredient found'})
        }
    }).catch(()=>{
        res.send({success:false,message:'Error occured while fetching ingredient'})
    })
}

const ingredientList = async function(req,res){
    console.log('ingredientList')

    let findIngredients = await Ingredient.find({is_deleted:false})
    res.send({success:true,ingredients:findIngredients})
}

const deleteIngredient = async function(req,res){
    console.log('deleteIngredient',req.body)

    let findIngredient = await Ingredient.findOne({lotnumber:req.body.lotnumber})
    if(findIngredient){
        let removeIngredient = await Ingredient.updateOne({lotnumber:req.body.lotnumber},{$set:{is_deleted:true}}).then(()=>{
            res.send({success:true,message:'Ingredient deleted successfully'})
        })
    }else{
        res.send({success:false,message:'Ingredient not found'})
    }
}

const ingredientThreshold = async function(req,res){
    console.log('Fetching Ingredients where available quantity is lesser than threshold quantity')

    let findFood = await Ingredient.find({ $expr: { $lt: [ "$availableQuantity" , "$thresholdQuantity" ] } });

    res.send({success:true,food:findFood})
}

const vendorIngredients = async function(req,res){
    console.log('vendorIngredients',req.query)
    let findIngredients = await Ingredient.find({vendorName:req.query.vendorName})

    res.send({success:true,ingredients:findIngredients})
}


module.exports = {
    createIngredient,
    updateIngredient,
    getIngredient,
    ingredientList,
    deleteIngredient,
    ingredientThreshold,
    vendorIngredients
}