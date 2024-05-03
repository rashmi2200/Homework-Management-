const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    title: String, // Title of the assignment
    details: String, // Details or description of the assignment
    fileLink: String, // Link to the assignment file or additional resources
    deadline: Date, // Deadline for the assignment
    subject: String // Subject of the assignment
});

module.exports = mongoose.model('Assignment', assignmentSchema);
