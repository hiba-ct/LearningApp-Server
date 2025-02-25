const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  sender: { type: String,
    enum: ['admin', 'student'],
     default: 'student' },
  
     message: {type:String},
  
  
  reply:{ 
    type: String,
     default: null 
    },
  
  
  role:{type:String},
  
 /*   userId:{
    type:String,
    required:true
},  */userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },

  timestamp: { type: Date, default: Date.now }
});


const  chatMessage=mongoose.model("chatMessage",chatMessageSchema)
module.exports =chatMessage