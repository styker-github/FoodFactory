const Food = require('../models/Food')
const Ingredient = require('../models/Ingredient')

// Create Food
const createFood = async function(req,res){
    console.log('createFood',req.body)

    let isValidParams = req.body.name && req.body.ingredients.length && req.body.lotNumber && req.body.costOfProduction && req.body.sellingCost
    
    if(isValidParams){
        try {
            let findFood = await Food.findOne({lotNumber:req.body.lotNumber})
            if(findFood){
                res.send({success:false,message:"Lot number already exist"})
            }else{
                let newFood = await Food.create({
                    name: req.body.name,
                    createdAt: new Date(),
                    cuisine: req.body.cuisine,
                    ingredients:req.body.ingredients,
                    lotNumber:req.body.lotNumber,
                    costOfProduction:req.body.costOfProduction,
                    sellingCost:req.body.sellingCost
                }).then((food)=>{
                    res.send({success:true,message:'Food created successfully',food})
                })
            }
        }catch (e) {
            console.log('Error occured in createFood',err)
            res.send({success:false,message:'Error occured while creating new Food'})
        }
    }else{
        res.send({success:false,message:"Please provide the required parameters to create Food"})
    }
}

const updateFood = async function(req,res){
    console.log('updateFood',req.body)

    try {
        let findFood = await Food.findOne({lotNumber:req.body.lotNumber})
        if(findFood){
            let getFood = await Food.findOne({_id:findFood._id}).then(async(data)=>{
                let editFood = await Food.updateOne({_id:data._id},{$set:{
                    name: req.body.name?req.body.name:data.name,
                    cuisine: req.body.cuisine?req.body.cuisine:data.cuisine,
                    ingredients:req.body.ingredients.length?req.body.ingredients:data.ingredients,
                    costOfProduction:req.body.costOfProduction?req.body.costOfProduction:data.costOfProduction,
                    sellingCost:req.body.sellingCost?req.body.sellingCost:data.sellingCost
                }})
            }).then(()=>{
                res.send({success:true,message:'Food updated successfully'})
            })
        }else{
            res.send({success:false,message:"Food not found"})
        }
    }catch (e) {
        console.log('Error in updateFood',e)
        res.send({success:false,message:'Error occured while updating Food'})
    }
    
}

const getFood = async function(req,res){
    console.log('getFood',req.query)
    let findFood = await Food.findOne({lotNumber:req.query.lotNumber}).then(async(data)=>{
        if(data){
            for(let i=0;i<data.ingredients.length;i++){
                let findIngredient = await Ingredient.findOne({lotnumber:data.ingredients[i]})
                data.ingredients[i] = findIngredient
            }
            res.send({success:true,food:data})
        }else{
            res.send({success:false,message:'No food found'})
        }
    }).catch(()=>{
        res.send({success:false,message:'Error occured while fetching food'})
    })
}

const foodList = async function(req,res){
    console.log('ingredientList')
    try{
        let findFoods = await Food.find({is_deleted:false})
        let foodArray =[]
        let finalFood = findFoods.map(async(x)=>{
            for(let i=0;i<x.ingredients.length;i++){
                let findIngredient = await Ingredient.findOne({lotnumber:x.ingredients[i]})
                x.ingredients[i] = findIngredient
            }
            foodArray.push(x)
        })
        await Promise.all(finalFood)
        res.send({success:true,foods:foodArray})
    }catch(e){
        console.log("Error in foodList",e)
        res.send({success:false,message:"Error occured in while fetching food"})
    }
}

const deleteFood = async function(req,res){
    console.log('deleteFood',req.body)

    let findFood = await Food.findOne({lotNumber:req.body.lotNumber})
    if(findFood){
        let removeFood = await Food.updateOne({lotNumber:req.body.lotNumber},{$set:{is_deleted:true}}).then(()=>{
            res.send({success:true,message:'Food deleted successfully'})
        })
    }else{
        res.send({success:false,message:'Food not found'})
    }
}

const foodCostMeasure = async function(req,res){
    console.log('Fetching Food where costOfProduction is higher than SellingCost')

    let findFood = await Food.find({ $expr: { $gt: [ "$costOfProduction" , "$sellingCost" ] } });

    res.send({success:true,food:findFood})
}

module.exports = {
    createFood,
    updateFood,
    getFood,
    foodList,
    deleteFood,
    foodCostMeasure
}