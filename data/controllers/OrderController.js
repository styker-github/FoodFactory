const Order = require('../models/Order')
const User = require('../models/User')
const generator = require('generate-password');

// Create Food
const createOrder = async function(req,res){
    console.log('createOrder',req.body)

    let isValidParams = req.body.Email && req.body.dateOfdelivery
    
    if(isValidParams){
        try {
                let orderNumCheck = true
                let orderNum
                while(orderNumCheck){
                    orderNum = generator.generate({
                        length: 8,
                        numbers: true
                    });
                    let findOrder = await Order.findOne({orderNum:orderNum})
                    if(findOrder){
                        continue
                    }else{
                        orderNumCheck = false
                    }
                }
                

                let newOrder = await Order.create({
                    orderNum: orderNum,
                    status: 'order_placed',
                    orderDate:new Date(),
                    dateOfdelivery: req.body.dateOfdelivery,
                    modeOfTransport:req.body.transportMode,
                    customer_email:req.body.Email
                }).then((order)=>{
                    res.send({success:true,message:'Order created successfully',order})
                })
        }catch (e) {
            console.log('Error occured in createOrder',e)
            res.send({success:false,message:'Error occured while creating new Order'})
        }
    }else{
        res.send({success:false,message:"Please provide the required parameters to create Order"})
    }
}

const orderList = async function(req,res){
    console.log('orderList')
    let getOrders = await Order.find({})
    res.send({success:true,orders:getOrders})
}

const updateOrderStatus = async function(req,res){
    console.log('updateOrderStatus',req.body)
    try{
        let findOrder = await Order.findOne({orderNum:req.body.orderNum})
        if(findOrder){
            let changeStatus = await Order.updateOne({orderNum:req.body.orderNum},{$set:{status:req.body.status}}).then(()=>{
                res.send({success:true,message:'Order updated successfully'})
            })
        }else{
            res.send({success:false,message:"Order Number does not exist"})
        }
    }catch(e){
        console.log('Error occured in updateOrderStatus',e)
        res.send({success:false,message:"Error occured while updating order status"})
    }
}

const getCustomerOrders = async function(req,res){
    console.log('getCustomerOrders',req.body)
    let fetchOrders = await Order.find({customer_email:req.body.Email})
    res.send({success:true,orders:fetchOrders})

}

module.exports = {
    createOrder,
    orderList,
    updateOrderStatus,
    getCustomerOrders
}