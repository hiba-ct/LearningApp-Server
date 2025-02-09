//import mongoose

const mongoose = require('mongoose')


const servicesSchema =new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    text:{
        required:true,
        type:String
    },
    number:{
        
        type:Number
    },
userId:{
        required:true,
        type:String
    }

})
const services =mongoose.model("services",servicesSchema)
module.exports =services