const services = require("../model/servicesModel");




//addservice
exports.addServicesController = async(req,res)=>{
    console.log('inside addServicesController')



 const userId = req.userId
console.log(userId);
console.log(req.body)


const { title,text}=req.body 

 console.log( title,text);
try {
   

    const existingService = await services.findOne({title});
if(existingService){
    res.status(406).json("service already exist ")
}else{
    const newServices =new services({
        title,text,userId
    })
    await newServices.save()
    res.status(200).json(newServices)
}
}catch(err){
    res.status(401).json(err)
}
}

//get home cservice - authorization not needed

exports.homePageServicesController = async(req,res)=>{
    console.log("inside homePageServicesController");

    try{
        const allHomeServices = await services.find().limit(3)
        res.status(200).json(allHomeServices)
    }catch(err){
res.status(401).json(err)
    }
}
//get all service
exports.allServicesController = async(req,res)=>{
    console.log("inside allServices Controller");

    try{
        const allServices = await services.find()
        res.status(200).json(allServices)
    }catch(err){
res.status(401).json(err)
    }
}

//updateServices


exports.editServicesController = async(req,res)=>{
    console.log("inside editServicesController");
const id=req.params.id
const userId=req.userId
const {title,text}=req.body



  
    try{
        const updateService = await services.findByIdAndUpdate({_id:id},{
            title,
            text,userId
        },{new:true})
        await updateService.save()
        res.status(200).json(updateService)
    }catch(err){
res.status(401).json(err)
    }
} 

//removeservices-need authorisation

exports.removeServicesController = async(req,res)=>{
    console.log("inside removeServicesController");
const {id}=req.params


  
    try{
        const deleteService = await services.findByIdAndDelete({_id:id})
        res.status(200).json(deleteService)
    }catch(err){
res.status(401).json(err)
    }
} 

   

