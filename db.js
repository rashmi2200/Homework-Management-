const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/userModel');
const cors = require("cors");
const Assignment = require('./models/assignmentModel'); // Import Assignment model
const Submission = require('./models/submissionModel'); 
const Student = require('./models/studentModel');
const Teacher = require('./models/teacherModel');
const Subject = require('./models/subjectModel');
const Grade = require('./models/gradeModel');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); 
const fs = require('fs');
const path = require('path');

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


// Route for fetching assignments data for students
app.get('/student/assignments', async (req, res) => {
    try {
        // Fetch all assignments from MongoDB
        const assignments = await Assignment.find({});
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// app.post('/submit_assignment', (req, res) => {
//     try {
//         // Handle assignment submission here
//         const uploadedFile = req.body.file; // Uploaded file (base64 encoded)
//         console.log('Uploaded File:', uploadedFile);

//         // You can access other assignment details from req.body if needed
//         // const { title, detail, subject, dueDate, dueTime, link } = req.body;

//         // Process and store the assignment data in the database

//         res.status(200).send('Assignment submitted successfully');
//     } catch (error) {
//         console.error('Error submitting assignment:', error);
//         res.status(500).send('Internal server error');
//     }
// });
// Endpoint for submitting assignments
app.post('/submit_assignment', async (req, res) => {
    try {
        // Extract assignment details from request body
        const { title, detail, subject, dueDate, dueTime, link, file } = req.body;

        console.log("payload boody",{ title, detail, subject, dueDate, dueTime, link, file })
        // const uploadedFile = req.body.file; // Uploaded file (base64 encoded)

        // Process and store the assignment data in the database
        const submission =  Submission.create({
            title,
            detail,
            subject,
            dueDate,
            dueTime,
            link,
            file // Store the file in the database
        });

        // Save the submission to the database
        // await submission.save();

        console.log('Submission saved to database:', submission);

        // Send success response
        res.status(200).json({ message: 'Assignment submitted successfully' });
    } catch (error) {
        console.error('Error submitting assignment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// //SUBMITTING FOR STUDENT

// // Route for submitting an assignment
// app.post("/submit_assignment", async (req, res) => {
//     try {
//       // Extract submission data from request body
//       const { assignmentTitle, dueDate, file, resubmit } = req.body;
  
//       // Create a new submission document
//       const newSubmission = new Submission({
//         assignmentTitle: assignmentTitle,
//         dueDate: dueDate,
//         file: file,
//         submittedAt: new Date(),
//         isResubmission: resubmit || false, // Set isResubmission to true if resubmit field is present and true, otherwise set to false
//       });
  
//       // Save the submission to the database
//       await newSubmission.save();
  
//       // Send success response
//       res.status(200).json({ message: "Assignment submitted successfully" });
//     } catch (error) {
//       console.error("Error submitting assignment:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
  
//   // Route for resubmitting an assignment
//   app.post("/resubmit_assignment", async (req, res) => {
//     try {
//       // Extract resubmission data from request body
//       const { assignmentId, userId, resubmissionDetails } = req.body;
  
//       // Create a new resubmission document
//       const newResubmission = new Resubmission({
//         assignmentId: assignmentId,
//         userId: userId,
//         resubmissionDetails: resubmissionDetails,
//         resubmittedAt: new Date(),
//       });
  
//       // Save the resubmission to the database
//       await newResubmission.save();
  
//       // Send success response
//       res.status(200).json({ message: "Assignment resubmitted successfully" });
//     } catch (error) {
//       console.error("Error resubmitting assignment:", error);
//       res.status(500).json({ message: "Internal server error" });
//     }
//   });
  
 

//FETCHING STUDENTS FILE FROM STUDENT SUBMISSION

// Endpoint for fetching assignments
app.get('/fetch_assignments', async (req, res) => {
    try {
        // Fetch assignments from the database
        const assignments = await Submission.find();

        // Send the fetched assignments as a JSON response
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Endpoint to fetch graded assignments
app.get('/graded_assignments', async (req, res) => {
    try {
        // Query the database to retrieve subject, assignment title, and submitted date
        const gradedAssignments = await Submission.find();

        // Send the fetched assignments as a JSON response
        res.status(200).json(gradedAssignments);
    } catch (error) {
        console.error('Error fetching graded assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/save_grade', async (req, res) => {
    try {
        const { title, subject, submittedDate, file ,grade: studentGrade } = req.body;


        const newGrade = await Grade.create({
            title: title,
            subject: subject,
            submittedDate: submittedDate,
            file: file,
            grade: studentGrade
            
        });

        console.log('Grade saved to database:', newGrade);

        res.status(200).json({ message: 'Grade saved successfully' });
    } catch (error) {
        console.error('Error saving grade:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Endpoint to fetch graded assignments from the Grade model
app.get('/grades_assignments', async (req, res) => {
    try {
        // Query the database to retrieve graded assignments
        const gradesAssignments = await Grade.find();

        // Send the fetched assignments as a JSON response
        res.status(200).json(gradesAssignments);
    } catch (error) {
        console.error('Error fetching graded assignments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route for handling student creation
app.post('/students/add', async (req, res) => {
    try {
        // Retrieve student data from request body
        const { name, email, phone } = req.body;

        // Create new student document
        const result = await Student.create({
            name,
            email,
            phone
        });

        console.log("result::", result);
        if (result) {
            // Send success response
            res.status(200).json({ message: 'Student added successfully' });
        }
    } catch (error) {
        console.error('Error adding student:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route for fetching student data
app.get('/students', async (req, res) => {
    try {
        // Fetch all students from MongoDB
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (error) {
        console.error('Error fetching students:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Route for handling teacher creation
app.post('/teachers/add', async (req, res) => {
    try {
        // Retrieve teacher data from request body
        const { name, email, phone } = req.body;

        // Create new teacher document
        const result = await Teacher.create({
            name,
            email,
            phone
        });

        console.log("result::", result);
        if (result) {
            // Send success response
            res.status(200).json({ message: 'Teacher added successfully' });
        }
    } catch (error) {
        console.error('Error adding teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route for fetching teacher data
app.get('/teachers', async (req, res) => {
    try {
        // Fetch all teachers from MongoDB
        const teachers = await Teacher.find({});
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




// Route for handling subject creation
app.post('/subjects/add', async (req, res) => {
    try {
        // Retrieve subject data from request body
        const { name, code } = req.body;

        // Create new subject document
        const result = await Subject.create({
            name,
            code
        });

        console.log("result::", result);
        if (result) {
            // Send success response
            res.status(200).json({ message: 'Subject added successfully' });
        }
    } catch (error) {
        console.error('Error adding subject:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Route for fetching subjects data
app.get('/subjects', async (req, res) => {
    try {
        // Fetch all subjects from MongoDB
        const subjects = await Subject.find({});
        res.status(200).json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});