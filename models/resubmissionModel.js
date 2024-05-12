const mongoose = require("mongoose");

// Define the Submission schema
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
    type: String, // Assuming you store file paths or URLs as strings
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
  isResubmission: {
    type: Boolean,
    default: false,
  },
  originalSubmission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
  },
});

// Create the Submission model
const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;