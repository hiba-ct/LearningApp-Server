//import mongoose

const mongoose = require('mongoose')


const teachersSchema =new mongoose.Schema({
   name:{
        required:true,
        type:String,
        unique:true
    },
  email:{
        required:true,
        type:String
    },
 contact:{
        required:true,
        type:Number
    },
    
   courses:{
        required:true,
        type:String
    },
    teachersImg:{
        required:true,
        type:String
    },
    userId:{
        required:true,
        type:String
    }

    
})
const teachers =mongoose.model("teachers",teachersSchema)
module.exports =teachers