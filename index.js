// Load .env file
require('dotenv').config();


const express = require('express');
const cors = require('cors');
const router = require('./routes/router'); 


//  to connect to MongoDB 
require('./connection');


// Create server
const pfServer = express();

// Middlewares
pfServer.use(cors());
pfServer.use(express.json()); 

// Use routes
pfServer.use(router);

pfServer.use('/uploads',express.static('./uploads'))

// Define port with environment variable support
const PORT = process.env.PORT || 3000;

// Start server
pfServer.listen(PORT, () => {
    console.log(`Server running successfully at port number ${PORT}`);
});

// Sample root route
pfServer.get('/', (req, res) => {
    res.status(200).send('<h1 style="color:red;">Server running successfully</h1>');
});
