const mongoose = require("mongoose");

// Define the schema for assignment submissions
const submissionSchema = new mongoose.Schema({
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model for students
    required: true,
  },
  file: {
    type: String, // Assuming the file path or link is stored as a string
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Submission model
const Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
