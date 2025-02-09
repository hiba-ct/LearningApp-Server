

 

const students = require("../model/studentModel");


//add student controller
 exports.addStudentController = async(req,res)=>{
    console.log('inside addStudentController')



 const userId = req.userId
console.log(userId);
console.log(req.body)


const { username,
    email,
    mobile_number,
    course,
    duration,
    total_fee,
    pending_fee}=req.body 

 console.log( username,
    email,
    mobile_number,
    course,
    duration,
    total_fee,
    pending_fee);
try {
   

    const existingStudent = await students.findOne({email});
if(existingStudent){
    res.status(406).json("student already exist ")
}else{
    const newStudents =new students({
        username,
        email,
        mobile_number,
        course,
        duration,
        total_fee,
        pending_fee,
       userId
    })
    await newStudents.save()
    res.status(200).json(newStudents)
}
}catch(err){
    res.status(401).json(err)
}
}

//get all students - authorization  needed

exports.allStudentsController = async(req,res)=>{
    console.log("inside allStudentsController");
  
    try{
        const allStudents = await students.find()
        res.status(200).json(allStudents)
    }catch(err){
res.status(401).json(err)
    }
}



//updateStudents


exports.editStudentsController = async(req,res)=>{
    console.log("inside editStudentsController");
const id=req.params.id
const userId=req.userId
const {username,
    email,
    mobile_number,
    course,
    duration,
    total_fee,
    pending_fee}=req.body



  
    try{
        const updateStudent = await students.findByIdAndUpdate({_id:id},{
            username,
    email,
    mobile_number,
    course,
    duration,
    total_fee,
    pending_fee,userId
        },{new:true})
        await updateStudent.save()
        res.status(200).json(updateStudent)
    }catch(err){
res.status(401).json(err)
    }
} 



//removestudents-need authorisation

exports.removeStudentsController = async(req,res)=>{
    console.log("inside removeStudentsController");
const {id}=req.params


  
    try{
        const deleteStudent = await students.findByIdAndDelete({_id:id})
        res.status(200).json(deleteStudent)
    }catch(err){
res.status(401).json(err)
    }
} 


