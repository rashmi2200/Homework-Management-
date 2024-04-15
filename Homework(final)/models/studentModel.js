const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String // Add the role field to the schema
});

module.exports = mongoose.model('Student', studentSchema);
