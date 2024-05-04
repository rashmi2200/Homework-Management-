const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');
const cors = require("cors");
const Assignment = require('./models/assignmentModel'); // Import Assignment model

// MongoDB connection string
app.use(cors({
    origin: ['http://127.0.0.1:5500', "http://localhost:5500"],
    credentials: true 
}));

 
const dbURI = "mongodb+srv://np03cs4a220511:j3wiuPl5QSgXY6Th@homework.k8lnaxo.mongodb.net/?retryWrites=true&w=majority&appName=homework";

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Get the default connection
const db = mongoose.connection;

// Event listeners to track connection status
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB');
});

// Middleware to parse JSON bodies of incoming requests
app.use(bodyParser.json());

// Route for handling user login requests
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log("email" ,email, "password", password);

    try {
        // Find the user with the provided email in the database
        const user = await User.findOne({ email });

        // If user is not found, return error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        // const passwordMatch = await bcrypt.compare(password, user.password);
        const passwordMatch = password === user.password;

        console.log("passwordMatch",passwordMatch)

        // If passwords don't match, return error
        if (!passwordMatch) {
            return res.status(401).json({success:false, message: "Invalid email or password" });
        }
        console.log("User role:", user.role);
        return res.status(200).json({ success: true, role: user.role, message: "Login successful" });
       

    } catch (error) {
        // If an error occurs, return error message
        console.error("Error during login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// app.post('/signup', async (req, res) => {
//     const { email, password } = req.body;
//     console.log("email" ,email, "password", password);

//     try {
//         // Find the user with the provided email in the database
//         const user = await User.findOne({ email });

//         // If user is not found, return error
//         if (!user) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         // Compare the provided password with the hashed password stored in the database
//         // const passwordMatch = await bcrypt.compare(password, user.password);
//         const passwordMatch = password === user.password;

//         console.log("passwordMatch",passwordMatch)

//         // If passwords don't match, return error
//         if (!passwordMatch) {
//             return res.status(401).json({success:false, message: "Invalid email or password" });
//         }

//         // If login is successful, return success message or token
//         return res.status(200).json({ success:true,message: "Login successful" });
//     } catch (error) {
//         // If an error occurs, return error message
//         console.error("Error during login:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// });


//CREATE ASSIGNMENT PORTAL DATABASE
//Route for handling assignment creation
// app.post('/createAssignment', async (req, res) => {
//     try {
//         // Retrieve assignment data from request body
//         const { title, details, fileLink, deadline, subject } = req.body;

//         // Create new assignment document
//         const newAssignment = new Assignment({
//             title: title,
//             details: details,
//             fileLink: fileLink,
//             deadline: deadline,
//             subject: subject
//         });

//         // Save the assignment to the database
//         await newAssignment.save();

//         // Send success response
//         res.status(201).json({ message: 'Assignment created successfully' });
//     } catch (error) {
//         console.error('Error creating assignment:', error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });


// Route for handling assignment creation
app.post('/createAssignment', async (req, res) => {
    try {
        // Retrieve assignment data from request body
        const { title, details, fileLink, deadline, subject } = req.body;

        // Create new assignment document
        const result =  await Assignment.create({
            title,
            details,
            fileLink,
            deadline,
            subject
        });

        // const assignmentId = newAssignment._id;
        
        console.log("result::",result);
        if(result){
            // Send success response
            res.status(200).json({ message: 'Assignment created successfully' });
            
        }

        // Save the assignment to the database
        // await newAssignment.save();

    } catch (error) {
        console.error('Error creating assignment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//FOR FETCHING THE DATA FROM THE DATABASE ASSIGNMENT
// Route for fetching assignments data
app.get('/assignments', async (req, res) => {
    try {
        // Fetch all assignments from MongoDB
        const assignments = await Assignment.find({});
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route for fetching assignment details
app.get('/assignment', async (req, res) => {
    const { title, subject } = req.query;

    try {
        // Find the assignment with the provided title and subject in the database
        const assignment = await Assignment.findOne({ title, subject });

        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        // If assignment is found, return its details
        return res.status(200).json(assignment);
    } catch (error) {
        console.error("Error fetching assignment details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


