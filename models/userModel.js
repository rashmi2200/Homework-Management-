const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    role: String // Add the role field to the schema
});

module.exports = mongoose.model('User', userSchema);
