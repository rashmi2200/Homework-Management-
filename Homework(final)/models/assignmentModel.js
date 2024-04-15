const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String // Add the role field to the schema
});

module.exports = mongoose.model('Assignment', assignmentSchema);
