//add project- authorization needed

const teachers = require("../model/teachersModel");

exports.addTeachersController = async(req,res)=>{
    console.log('inside addTeachersController')
const userId = req.userId
console.log(userId);
const {name,email,contact,courses}=req.body
const teachersImg = req.file.filename
console.log(name,email,contact,courses,teachersImg);
try {
   

    const existingTeacher = await teachers.findOne({email });
if(existingTeacher){
    res.status(406).json("techer already added ")
}else{
    const newTeacher =new teachers({
        name,email,contact,courses,teachersImg ,userId
    })
    await newTeacher.save()
    res.status(200).json(newTeacher)
}
}catch(err){
    res.status(401).json(err)
}
}


//get home teacher - authorization not needed

exports.homePageTeachersController = async(req,res)=>{
    console.log("inside homePageTeachersController");

    try{
        const allHomeTeachers = await teachers.find().limit(3)
        res.status(200).json(allHomeTeachers)
    }catch(err){
res.status(401).json(err)
    }
}


//get all teachers - authorization  needed

exports.allTeachersController = async(req,res)=>{
    console.log("inside allTeachersController");

    try{
        const allTeachers = await teachers.find()
        res.status(200).json(allTeachers)
    }catch(err){
res.status(401).json(err)
    }
}


//editTeachers-need authorisation

exports.editTeachersController = async(req,res)=>{
    console.log("inside editTeachersController");
const id=req.params.id
const userId=req.userId
const {name,email,contact,courses,teachersImg}=req.body
const reUploadTeachersImg = req.file?req.file.filename:teachersImg



  
    try{
        const updateTeachers = await teachers.findByIdAndUpdate({_id:id},{
            name,email,contact,courses,
            teachersImg:reUploadTeachersImg,userId
        },{new:true})
        await updateTeachers.save()
        res.status(200).json(updateTeachers)
    }catch(err){
res.status(401).json(err)
    }
} 

//removeservices-need authorisation

exports.removeTeachersController = async(req,res)=>{
    console.log("inside removeTeachersController");
const {id}=req.params


  
    try{
        const deleteTeacher = await teachers.findByIdAndDelete({_id:id})
        res.status(200).json(deleteTeacher)
    }catch(err){
res.status(401).json(err)
    }
} 

   





