const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrderSchema = new Schema({
	orderNum:{
		type: String
	},
	status:{
        type: String,
        enum: ['order_placed','order_processed','order_completed']
	},
	orderDate:{
        type: Date
    },
    dateOfdelivery:{
        type:String
    },
    modeOfTransport:{
        type:String
    },
    customer_email:{
        type:String
    }
});

module.exports = Order = mongoose.model("order", OrderSchema);
