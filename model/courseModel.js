//import mongoose

const mongoose = require('mongoose')


const coursesSchema =new mongoose.Schema({
   course:{
        required:true,
        type:String,
        unique:true
    },
   category:{
        required:true,
        type:String
    },
    discription:{
        required:true,
        type:String
    },
   courseImg:{
        required:true,
        type:String
    },
    userId:{
        required:true,
        type:String
    }
    
})
const courses =mongoose.model("courses",coursesSchema)
module.exports = courses