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
    origin: ['http://127.0.0.1:5501', "http://localhost:5501"],
    credentials: true 
}));

 
const dbURI = "mongodb+srv://np03cs4a220511:j3wiuPl5QSgXY6Th@homework.k8lnaxo.mongodb.net/?retryWrites=true&w=majority&appName=homework";

// Connect to MongoDB
mongoose.connect(dbURI); //, { useNewUrlParser: true, useUnifiedTopology: true }

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

// Route for updating assignment details
// app.put('/update_assignment', async (req, res) => {
//     const { title, subject } = req.query; // Extract title and subject from query parameters
//     const updatedData = req.body; // Extract updated data from request body

//     console.log('Received title:', title);
//     console.log('Received subject:', subject);
//     console.log('Received updated data:', updatedData);

//     try {
//         // Update the assignment with the provided title and subject in the database
//         const result = await Assignment.updateOne({ title, subject }, updatedData);

//         if (result.n === 0) {
//             // If no assignment is found, return error
//             return res.status(404).json({ message: "Assignment not found" });
//         }

//         // If assignment is updated successfully, return success message
//         return res.status(200).json({ message: "Assignment updated successfully" });
//     } catch (error) {
//         console.error("Error updating assignment details:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// });


// Backend endpoint to update assignment
app.put('/update_assignment', async (req, res) => {
    const { title, subject } = req.query; // Extract title and subject from query parameters
    const updatedData = req.body; // Extract updated data from request body

    try {
        // Find the assignment with the provided title and subject
        const assignment = await Assignment.findOne({ title, subject });

        if (!assignment) {
            // If no assignment is found, return error
            return res.status(404).json({ message: "Assignment not found" });
        }

        // Update the assignment with the provided data
        assignment.set(updatedData);
        await assignment.save();

        // If assignment is updated successfully, return updated assignment
        return res.status(200).json(assignment);
    } catch (error) {
        console.error("Error updating assignment details:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Backend endpoint to delete assignment
app.delete('/delete_assignment', async (req, res) => {
    const { title, subject } = req.query; // Extract title and subject from query parameters

    try {
        // Find and delete the assignment with the provided title and subject
        const deletedAssignment = await Assignment.findOneAndDelete({ title, subject });

        if (!deletedAssignment) {
            // If no assignment is found, return error
            return res.status(404).json({ message: "Assignment not found" });
        }

        // If assignment is deleted successfully, return deleted assignment
        return res.status(200).json(deletedAssignment);
    } catch (error) {
        console.error("Error deleting assignment:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});






//SUBMITTING FOR STUDENT

// Route for submitting an assignment
app.post("/submit_assignment", async (req, res) => {
    try {
      // Extract submission data from request body
      const { assignmentTitle, dueDate, file, resubmit } = req.body;
  
      // Create a new submission document
      const newSubmission = new Submission({
        assignmentTitle: assignmentTitle,
        dueDate: dueDate,
        file: file,
        submittedAt: new Date(),
        isResubmission: resubmit || false, // Set isResubmission to true if resubmit field is present and true, otherwise set to false
      });
  
      // Save the submission to the database
      await newSubmission.save();
  
      // Send success response
      res.status(200).json({ message: "Assignment submitted successfully" });
    } catch (error) {
      console.error("Error submitting assignment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Route for resubmitting an assignment
  app.post("/resubmit_assignment", async (req, res) => {
    try {
      // Extract resubmission data from request body
      const { assignmentId, userId, resubmissionDetails } = req.body;
  
      // Create a new resubmission document
      const newResubmission = new Resubmission({
        assignmentId: assignmentId,
        userId: userId,
        resubmissionDetails: resubmissionDetails,
        resubmittedAt: new Date(),
      });
  
      // Save the resubmission to the database
      await newResubmission.save();
  
      // Send success response
      res.status(200).json({ message: "Assignment resubmitted successfully" });
    } catch (error) {
      console.error("Error resubmitting assignment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
 

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});