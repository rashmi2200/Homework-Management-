const mongoose = require("mongoose");

// Define Submission schema
const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment", // Reference to the Assignment model
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  submissionDetails: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Submission model
const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
