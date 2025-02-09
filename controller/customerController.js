const customers = require('../model/customerModel');
const users = require('../model/customerModel');
 

// customer controller
exports.submitController = async (req, res) => {
    console.log('Inside customer controller');
    console.log(req.body); // This should log the JSON data sent in the request body

    const { fullname,email,contact,course,message } = req.body;

    try {
        // Check if user already exists
        const existingUser = await customers.findOne({ email });
        if (existingUser) {
            return res.status(406).json('Account already exists');
        }

        // Create new user if none exists with the email
        const newCustomer = new customers({
            
            fullname,email,contact,course,message,
        });

        await newCustomer.save();
        res.status(200).json(newCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Error registering customer', error });
    }
};

//get all customer - authorization  needed

exports.allsubmitController = async(req,res)=>{
    console.log("inside allCustomerController");

    try{
        const allCustomers = await customers.find()
        res.status(200).json(allCustomers)
    }catch(err){
res.status(401).json(err)
    }
}


//removecontact-need authorisation

exports.removeSubmitController = async(req,res)=>{
    console.log("inside removeCustomerController");
const {id}=req.params


  
    try{
        const deleteCustomer = await customers.findByIdAndDelete({_id:id})
        res.status(200).json(deleteCustomer)
    }catch(err){
res.status(401).json(err)
    }
} 




