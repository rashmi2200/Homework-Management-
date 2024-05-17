const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    submittedDate: {
        type: Date,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    fileLink: { // Add the fileLink field
        type: String,
        required: false // Optional if not all grades have a file link
    }
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
