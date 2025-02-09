

const courses = require('../model/courseModel');

 





 //add course controller

 exports.addCourseController = async(req,res)=>{
    console.log('inside addCourseController')



 const userId = req.userId
console.log(userId);
console.log(req.body)
/* res.status(200).json("addCourse request recieved!!!") */

const {course ,category,discription}=req.body 
 const  courseImg = req.file.filename 
 console.log(course ,category,discription,courseImg);
try {
   

    const existingCourse = await courses.findOne({ course });
if(existingCourse){
    res.status(406).json("course already exist ")
}else{
    const newCourses =new courses({
        course ,category,discription,courseImg,userId
    })
    await newCourses.save()
    res.status(200).json(newCourses)
}
}catch(err){
    res.status(401).json(err)
}
}

//get home course - authorization not needed

exports.homePageCourseController = async(req,res)=>{
    console.log("inside homePageCoursetController");

    try{
        const allHomeCourse = await courses.find().limit(3)
        res.status(200).json(allHomeCourse)
    }catch(err){
res.status(401).json(err)
    }
}

//get all course - authorization  needed

exports.allCourseController = async(req,res)=>{
    console.log("inside allCourseController");

    try{
        const allCourse = await courses.find()
        res.status(200).json(allCourse)
    }catch(err){
res.status(401).json(err)
    }
}


//edit course

exports.editCoursesController = async(req,res)=>{
    console.log("inside editCoursesController");
const id=req.params.id
const userId=req.userId
const {course ,category,discription,courseImg}=req.body
const reUploadCourseImg = req.file?req.file.filename:courseImg



  
    try{
        const updateCourses = await courses.findByIdAndUpdate({_id:id},{
            course ,category,discription,
            courseImg:reUploadCourseImg,userId
        },{new:true})
        await updateCourses.save()
        res.status(200).json(updateCourses)
    }catch(err){
res.status(401).json(err)
    }
} 

//removecourse-need authorisation

exports.removeCoursesController = async(req,res)=>{
    console.log("inside removeCourseController");
const {id}=req.params


  
    try{
        const deleteCourse = await courses.findByIdAndDelete({_id:id})
        res.status(200).json(deleteCourse)
    }catch(err){
res.status(401).json(err)
    }
} 

   

 