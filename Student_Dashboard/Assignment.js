// // Route for handling assignment submissions by students
// app.post("/Submit Assignment", async (req, res) => {
//   try {
//     // Retrieve assignment data from request body
//     const { assignmentTitle, dueDate, file } = req.body;

//     // Create new assignment document
//     const newAssignment = new Assignment({
//       title: assignmentTitle,
//       dueDate: dueDate,
//       file: file,
//     });

//     // Save the assignment to the database
//     await newAssignment.save();

//     // Send success response
//     res.status(201).json({ message: "Assignment submitted successfully" });
//   } catch (error) {
//     console.error("Error submitting assignment:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// Import necessary modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/userModel");
const Assignment = require("./models/assignmentModel");
const cors = require("cors");

// Middleware to parse JSON bodies of incoming requests
app.use(bodyParser.json());

// Enable CORS
app.use(
  cors({
    origin: ["http://127.0.0.1:5501", "http://localhost:5501"],
    credentials: true,
  })
);

// Connect to MongoDB
const dbURI =
  "mongodb+srv://np03cs4a220511:j3wiuPl5QSgXY6Th@homework.k8lnaxo.mongodb.net/?retryWrites=true&w=majority&appName=homework";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define routes
app.post("/submit_assignment", async (req, res) => {
  try {
    const { userId, assignmentId, fileLink } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the assignment by ID
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Add the submission to the user's submissions array
    user.submissions.push({
      assignment: assignmentId,
      fileLink: fileLink,
      status: "Pending", // You can set the initial status to "Pending"
    });

    // Save the user with the updated submissions
    await user.save();

    res.status(200).json({ message: "Assignment submitted successfully" });
  } catch (error) {
    console.error("Error submitting assignment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
