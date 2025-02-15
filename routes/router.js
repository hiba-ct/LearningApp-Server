//import express
const express = require('express')
//import usercontroller
const userController = require('../controller/userController')

//import middleware
 const jwtMiddleware = require( '../middleware/jwtMiddleware')
const  customerController  = require('../controller/customerController')
const  courseController  = require('../controller/courseController')
const  studentsController  = require('../controller/studentsController')
const  servicesController  = require('../controller/servicesController')
const  teachersController  = require('../controller/teachersController')
const  chatBoxController  = require('../controller/chatBoxController')
const multerMiddleware = require('../middleware/multerMiddleware')


 


//create object for router class

const router = new express.Router()



//signup: http://localhost:4000/signup
router.post('/signup',userController.registerController)

//login : http://localhost:3000/login
router.post('/login',userController.loginController)

//login : http://localhost:3000/submit
router.post('/submit', customerController.submitController);

//all-customers :http://localhost:3000/all-courses
router.get('/all-submit', jwtMiddleware, customerController.allsubmitController);
//teachers/id/remove:http://localhost:3000/user-services/id/remove
router.delete('/contact/:id/remove',jwtMiddleware,customerController.removeSubmitController);







//add-courses : http://localhost:3000/submit
router.post('/add-courses', jwtMiddleware,multerMiddleware.single('courseImg') ,courseController.addCourseController);

//home-courses :http://localhost:3000/home-courses
router.get('/home-courses', courseController.homePageCourseController);

//all-courses :http://localhost:3000/all-courses
router.get('/all-courses', jwtMiddleware, courseController.allCourseController);



//add-students: http://localhost:3000/addstudents
router.post('/add-students', jwtMiddleware ,studentsController.addStudentController);


//edit course
router.put(
    '/course/:id/edit',
    jwtMiddleware, // Validate JWT
    multerMiddleware.single('courseImg'), // Process file upload
    courseController.editCoursesController // Handle request
);

//tcourses/id/remove:http://localhost:3000/user-services/id/remove
router.delete('/courses/:id/remove',jwtMiddleware,courseController.removeCoursesController);


//addservices
router.post('/add-services', jwtMiddleware ,servicesController.addServicesController);


//home-services :http://localhost:3000/home-services
router.get('/home-services', servicesController.homePageServicesController);

//all-services :http://localhost:3000/all-services
router.get('/all-services',  servicesController.allServicesController);

//services/10/edit:http://localhost:3000/services/id/edit
router.put('/services/:id/edit',jwtMiddleware,servicesController.editServicesController);

//services/id/remove:http://localhost:3000/user-services/id/remove
router.delete('/services/:id/remove',jwtMiddleware, servicesController.removeServicesController);


////addteachers
router.post(
    '/add-teachers',
    jwtMiddleware,
    multerMiddleware.single('teachersImg'), 
    teachersController.addTeachersController
);


//home-teacher :http://localhost:3000/home-services
router.get('/home-teachers', teachersController.homePageTeachersController);


//all-teachers :http://localhost:3000/all-courses
router.get('/all-teachers', jwtMiddleware, teachersController.allTeachersController);


//all-students :http://localhost:3000/all-courses
router.get('/all-students', jwtMiddleware, studentsController.allStudentsController);

//students/id/remove:http://localhost:3000/user-services/id/remove
router.delete('/students/:id/remove',jwtMiddleware,studentsController.removeStudentsController);

//students/10/edit:http://localhost:3000/services/id/edit
router.put('/students/:id/edit',jwtMiddleware,studentsController.editStudentsController);


//teachers/10/edit:http://localhost:4000/projects/id/edit
router.put('/teachers/:id/edit',jwtMiddleware,multerMiddleware.single('teachersImg') ,teachersController.editTeachersController);



//teachers/id/remove:http://localhost:3000/user-services/id/remove
router.delete('/teachers/:id/remove',jwtMiddleware,teachersController.removeTeachersController);

//editadmin
//admin/10/edit:http://localhost:3000/services/id/edit
router.put('/admin/:id/edit',jwtMiddleware,userController.editRegisterController);

//message
router.get('/messages', jwtMiddleware, chatBoxController.getAllMessagesController);
router.post('/sendmessage', chatBoxController.sendMessageController);
 router.post('/replymessage/:messageId',jwtMiddleware,chatBoxController.replyMessageController); 

 router.delete("/deleteMessage/:messageId", jwtMiddleware, chatBoxController.removeMessgeController);
module.exports = router 