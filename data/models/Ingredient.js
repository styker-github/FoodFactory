const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema = new Schema({
	name:{
		type: String
	},
	lotnumber:{
        type: Number
	},
	availableQuantity:{
        type: Number
    },
    thresholdQuantity:{
        type:Number
    },
    price:{
        type:Number
    },
    vendorName:{
        type:String
    },
    vendorEmail:{
        type:String
    },
    is_deleted:{
        type:Boolean,
        required:true,
        default:false
    }

});

module.exports = Ingredient = mongoose.model("ingredient", IngredientSchema);
