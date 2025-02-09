//import mongoose

const mongoose = require('mongoose')


const studentsSchema =new mongoose.Schema({
   username:{
        required:true,
        type:String,
        unique:true
    },
  email:{
        required:true,
        type:String
    },
   mobile_number:{
        required:true,
        type:Number
    },
   course:{
        required:true,
        type:String
    },
    duration:{
        required:true,
        type:String
    },
    total_fee:{
        required:true,
        type:Number
    },
    pending_fee:{
        required:true,
        type:Number
    },
    userId:{
        required:true,
        type:String
    },
    
    
})
const students =mongoose.model("students",studentsSchema)
module.exports =students