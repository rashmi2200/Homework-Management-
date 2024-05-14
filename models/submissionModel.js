const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    // subject: {
    //     type: String,
    //     required: false
    // },
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
    subject: String,
    dueDate: String, 
    dueTime: String, 
    link: String, 
    
    deadline: {
        type: Date,
        required: false
    },
    submittedAt: {
        type: Date,
        default: Date.now,
        required: false // Automatically set to current date/time when submitted
    },
    status: {
        type: String,
        enum: ['pending', 'submitted', 'missed'],
        default: 'pending',
        required: false, 
    }
});

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;