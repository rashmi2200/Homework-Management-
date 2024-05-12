const mongoose = require("mongoose");

// Define Submission schema
const submissionSchema = new mongoose.Schema({
  assignmentTitle: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  file: {
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