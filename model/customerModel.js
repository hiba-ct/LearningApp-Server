//import mongoose

const mongoose = require('mongoose')


const customerSchema =new mongoose.Schema({
    fullname:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    contact:{
        required:true,
        type:Number
    },
    course:{
        required:true,
        type:String
    },
    message:{
        required:true,
        type:String
    }
  
    
})
const customers =mongoose.model("customers",customerSchema)
module.exports = customers