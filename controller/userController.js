
const users = require('../model/userModel');
 const jwt = require('jsonwebtoken'); 
 const bcrypt = require('bcryptjs');

// Register controller
exports.registerController = async (req, res) => {
    console.log('Inside register controller');
    console.log(req.body); // This should log the JSON data sent in the request body
    
    const { username, email, password,role } = req.body;

    try {
        // Check if user already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(406).json('Account already exists');
        }

        // Create new user if none exists with the email
        const newUser = new users({
            username,
            email,
            password,
            role
          
        });

        await newUser.save();
        res.status(200).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};



exports.allRegistersController = async(req,res)=>{
    console.log("inside allRegisterController");

    try{
        const allUsers = await users.find()
        res.status(200).json(allUsers)
    }catch(err){
res.status(401).json(err)
    }
}



//updateRegister



exports.editAdminDetails = async (req, res) => {
    console.log("Inside editAdminDetails");
    const id = req.params.id;
    const { username, email, password } = req.body;

    try {
        // Find user by ID and check if role is "admin"
        const admin = await users.findOne({ _id: id, role: "admin" });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found or not authorized" });
        }

        // Update fields conditionally
        if (username) admin.username = username;
        if (email) admin.email = email;

        // Hash the password if it's being updated
        if (password) {
            /* const hashedPassword = await bcrypt.hash(password, 10); */
            admin.password = password;
        }

        // Save the updated admin details
        const updatedAdmin = await admin.save();

        res.status(200).json({ message: "Admin updated successfully", user: updatedAdmin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating admin details", error: err });
    }
};



// Get admin details by ID
exports.getAdminDetails = async (req, res) => {
    console.log("inside admindetails")
    try {
        const { id } = req.params; // Get the admin ID from params

        // Find user by ID and check if role is "admin"
        const admin = await users.findOne({ _id: id, role: "admin" });

        if (!admin) {
            return res.status(404).json({ message: "Admin not found or not authorized" });
        }

        res.status(200).json(admin);
    } catch (error) {
        console.error("Error fetching admin details:", error);
        res.status(500).json({ message: "Error fetching admin details" });
    }
};



// Login controller

/*  exports.loginController = async(req,res)=>{
    console.log('inside loginController')
    const{email,password}=req.body
    console.log(email,password);
    
    
    
    
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWTPASSWORD);

            //console.log('Generated Token:', token);
            res.status(200).json({user:existingUser,token})
        }

        
        else{
           
           
       
            res.status(404).json('Account does not exist')
        }
        }catch(error){
            res.status(401).json(error)
        }
    } 
 */

   
    
    exports.loginController = async (req, res) => {
        console.log("inside loginController");
        const { email, password } = req.body;
      
        try {
          const existingUser = await users.findOne({ email, password });
      
          if (existingUser) {
            console.log("User found, role:", existingUser.role); // Debugging
      
            // ✅ Ensure role is included in token
            const token = jwt.sign(
              { userId: existingUser._id, role: existingUser.role }, // Include role
              process.env.JWTPASSWORD,
            /*   { expiresIn: "1h" }  */// Optional expiry
            );
      
            res.status(200).json({ user: existingUser, token });
          } else {
            res.status(404).json("Account does not exist");
          }
        } catch (error) {
          console.error("Login Error:", error);
          res.status(401).json(error);
        }
      };
      

   

