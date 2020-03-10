const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoodSchema = new Schema({
	name:{
		type: String
	},
	createdAt:{
        type: Date
	},
	cuisine:{
        type: String
    },
    ingredients:{
        type:Array
    },
    lotNumber:{
        type:Number
    },
    costOfProduction:{
        type:Number
    },
    sellingCost:{
        type:Number
    },
    is_deleted:{
        type:Boolean,
        required:true,
        default:false
    }
});

module.exports = Food = mongoose.model("food", FoodSchema);
