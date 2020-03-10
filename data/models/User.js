const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	Name:{
		type: String
	},
	Email:{
        type: String,
        required:true
	},
	Status:{
        type: Boolean
    },
    lastLoginAt:{
        type:Date
    },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    },
    password:{
        type:String,
        required:true
    },
    is_deleted:{
        type:Boolean,
        required:true,
        default:false
    }
});

module.exports = User = mongoose.model("user", UserSchema);
