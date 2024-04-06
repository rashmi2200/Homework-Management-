const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser'); // Import body-parser middleware
const mongoose = require('mongoose');
const User = require('./models/userModel');

app.use(bodyParser.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect("mongodb+srv://np03cs4a220511:j3wiuPl5QSgXY6Th@homework.k8lnaxo.mongodb.net/?retryWrites=true&w=majority&appName=homework");

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email and password
        const user = await User.findOne({ email, password });

        if (user) {
            // If user is found, login successful
            res.json({ success: true, message: 'Login successful', user });
        } else {
            // If user is not found, login failed
            res.json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        // Handle errors
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'An error occurred during login' });
    }
});

const PORT = 3000;

http.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});
