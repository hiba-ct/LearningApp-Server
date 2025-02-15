/* const jwt = require('jsonwebtoken');

const jwtMiddleware = (req, res, next) => {
  console.log('Inside JWT middleware');

  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(404).json('Authorization failed...Token is missing!!!');
  }

  const token = authHeader.split(' ')[1];
  console.log('Token:', token);

  if (token) {
    try {
      // Verify token
      const jwtResponse = jwt.verify(token, process.env.JWTPASSWORD);
      console.log('Decoded JWT Response:', jwtResponse);

      // Assign the correct ID
      req.courseId = jwtResponse.courseId || jwtResponse.userId; // Adjust as per your token's payload
      next(); // Proceed to the controller
    } catch (err) {
      console.error(err);
      res.status(404).json('Authorization failed...please login!!!');
    }
  } else {
    res.status(404).json('Authorization failed...Token is missing!!!');
  }
};

module.exports = jwtMiddleware;
 */



 const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    console.log(`inside jwt middleware`);

     const token =req.headers["authorization"].split(' ')[1]
    console.log(token);
    if(token){
        try{
       const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD) 
        
        console.log(jwtResponse);
         req.userId = jwtResponse.userId
         req.role = jwtResponse.role
        
      
         next() //request middleware to controller
        
    }
    catch(err){
        res.status(404).json("Authorization failed...please login!!!")
    }
      }else{
        res.status(404).json("Authorization failed...Token is missing!!!")
    }
   
}
module.exports = jwtMiddleware


