const User = require('../models/User')
const bcrypt = require('bcryptjs');
var generator = require('generate-password');
const salt = bcrypt.genSaltSync(8)
const helper = require('./helper')

// User Signup
const userSignup = async function(req,res){
    console.log('User Signup',req.body)

    let isValidParams = req.body.Email && req.body.password
    
    if(isValidParams){
        try {
            
                let hashedPassword = bcrypt.hashSync(req.body.password,salt)
                let createUser = await User.create({
                    Name: req.body.Name,
                    Email: req.body.Email,
                    Status: true,
                    createdAt:new Date(),
                    updatedAt:new Date(),
                    password:hashedPassword
                }).then((user)=>{
                    res.send({success:true,message:'User signup successful',userId:user._id,user:{name:user.Name,email:user.Email}})
                })
        }catch (e) {
            console.log('Error occured during User signup',e)
            res.send({success:false,message:'Error occured during User signup'})
        }
    }else{
            res.send({success:false,message:"Both Email and Password required for User signup."})
    }
}

// User Login
const userLogin = async function(req,res){
    console.log('User login',req.body)

    let isValidParams = req.body.Email && req.body.password

    try {
        if(isValidParams){
            const checkUser = await User.findOne({Email:req.body.Email})
            if (checkUser) {
                let passwordIsValid = await bcrypt.compareSync(req.body.password, checkUser.password)
                console.log('Password isValid',passwordIsValid)
                if (!passwordIsValid) { 
                    res.send({success: false, message:"Check your password"})
                }else{
                    let editUser = await User.updateOne({Email:req.body.Email},{$set:{lastLoginAt:new Date()}})
                    res.send({success: true, message:"Logged in successfully",userId:checkUser._id})
                }
            }else{
                res.send({success: false, message: "No User found"})
            }
        }
        else{
            res.send({success:false,message:"Please provide Email and password"})
        }
    }catch (e) {
        console.log('Error in User login',e)
        res.send({success:false,message:'Error occured while logging in user',error:e})
    }
}

const changePassword = async function(req,res){
    console.log('ChangePassword',req.body)

    let isValidParams = req.body.Email && req.body.currentPassword && req.body.newPassword
    if(isValidParams){
        try {
            
            let findUser = await User.findOne({Email:req.body.Email})
            if(findUser){
                let passwordIsValid = await bcrypt.compareSync(req.body.currentPassword, findUser.password)
                console.log('Password isValid',passwordIsValid)
                if (passwordIsValid) { 
                    let hashedPassword = bcrypt.hashSync(req.body.newPassword,salt)
                    let updateUser = await User.updateOne({_id:findUser._id},{$set:{
                        password:hashedPassword
                    }}).then(()=>{
                        res.send({success:true,message:'Password updated successfully'})
                    })
                }else{
                    res.send({success:false,message:"Please enter correct credentials"})
                }
            }else{
                res.send({success:false,message:"User not found"})
            }
            
        }catch (e) {
            console.log('Error in ChangePassword',e)
            res.send({success:false,message:'Error occured while updating user password'})
        }
    }
    else{
        res.send({success:false,message:"Please provide email and password"})
    }
}

const resetPassword = async function(req,res){
    console.log('ResetPassword',req.body)

    let isValidParams = req.body.Email 
    if(isValidParams){
        try {
            
            let findUser = await User.findOne({Email:req.body.Email})
            if(findUser){
                    let password = generator.generate({
                        length: 6,
                        numbers: true
                    });
                    let hashedPassword = bcrypt.hashSync(password,salt)
                    let updateUser = await User.updateOne({_id:findUser._id},{$set:{
                        password:hashedPassword
                    }}).then(()=>{
                        helper.sendMail(req.body.Email,password)
                        res.send({success:true,message:'Check your mail for the new Password'})
                    })
            }else{
                res.send({success:false,message:"User not found"})
            }
        }catch (e) {
            console.log('Error in ResetPassword',e)
            res.send({success:false,message:'Error occured while resetting user password'})
        }
    }
    else{
        res.send({success:false,message:"Please provide email and password"})
    }
}

const deactivateUser = async function(req,res){
    console.log('ResetPassword',req.body)

    let isValidParams = req.body.Email 
    if(isValidParams){
        try {
            
            let findUser = await User.findOne({Email:req.body.Email})
            if(findUser){
                let disableUser = await User.updateOne({_id:findUser._id},{$set:{
                    Status: false
                }}).then(()=>{
                    res.send({success:true,message:"User deactivated successfully"})
                })
            }else{
                res.send({success:false,message:"User not found"})
            }
        }catch (e) {
            console.log('Error in deactivateUser',e)
            res.send({success:false,message:'Error occured while deactivating user'})
        }
    }
    else{
        res.send({success:false,message:"Please provide email"})
    }
}

const updateUser = async function(req,res){
    console.log('updateuser',req.body)

    try {
        let findUser = await User.findOne({Email:req.body.Email})
        if(findUser){
            let getUser = await User.findOne({_id:findUser._id}).then(async(data)=>{
                let editUser = await User.updateOne({_id:data._id},{$set:{
                    Name: req.body.Name?req.body.Name:data.name,
                    Status: req.body.Status?Boolean(req.body.Status):data.Status,
                    updatedAt:new Date(),
                }})
            }).then(()=>{
                res.send({success:true,message:'User updated successfully'})
            })
        }else{
            res.send({success:false,message:"User not found"})
        }
    }catch (e) {
        console.log('Error in updateUser',e)
        res.send({success:false,message:'Error occured while updating user'})
    }
}

const getUser = async function(req,res){
    console.log('getUser',req.body)

    let findUser = await User.findOne({Email:req.body.Email}).then((data)=>{
        if(data){
            delete data._doc['password']
            res.send({success:true,user:data})
        }else{
            res.send({success:false,message:'No user found'})
        }
    }).catch(()=>{
        res.send({success:false,message:'Error occured while fetching user'})
    })
}

const userList = async function(req,res){
    console.log('getUser')

    let findUsers = await User.find({is_deleted:false})
    let finalUsers = findUsers.map(x=>{
        delete x._doc['password']
        return x
    })
    res.send({success:true,users:finalUsers})
}

const deleteUser = async function(req,res){
    console.log('deleteUser',req.body)

    let findUser = await User.findOne({Email:req.body.Email})
    if(findUser){
        let removeUser = await User.updateOne({Email:req.body.Email},{$set:{is_deleted:true}}).then(()=>{
            res.send({success:true,message:'User deleted successfully'})
        })
    }else{
        res.send({success:false,message:'user not found'})
    }
}




module.exports = {
    userSignup,
    userLogin,
    changePassword,
    resetPassword,
    deactivateUser,
    updateUser,
    getUser,
    userList,
    deleteUser
}