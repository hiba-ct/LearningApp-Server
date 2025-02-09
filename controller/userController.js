
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



//updateRegister







exports.editRegisterController = async (req, res) => {
    console.log('Inside editRegisterController');
    const id = req.params.id;

    const { username, email, password, role } = req.body;

    try {
        // Find the user by ID
        const existingUser = await users.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields conditionally
        if (username) existingUser.username = username;
        if (email) existingUser.email = email;

        // Hash the password if it's being updated
        if (password) {
            /* const hashedPassword = await bcrypt.hash(password, 10); */
            existingUser.password = password;
        }

        // Update the role if provided
        if (role) existingUser.role = role

        // Save the updated user
        const updatedUser = await existingUser.save();

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user', error: err });
    }
};




// Login controller

 exports.loginController = async(req,res)=>{
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


   