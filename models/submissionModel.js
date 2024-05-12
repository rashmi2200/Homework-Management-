const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    file: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now // Automatically set to current date/time when submitted
    },
    status: {
        type: String,
        enum: ['pending', 'submitted', 'missed'],
        default: 'pending'
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;