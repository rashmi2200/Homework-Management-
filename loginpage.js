function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    var toggleIcon = document.getElementById("toggle-password");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleIcon.classList.add("visible");
    } else {
        passwordField.type = "password";
        toggleIcon.classList.remove("visible");
    }
}


/*DATABASE*/
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener for form submission
    document.getElementById('login-form').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Send POST request to login endpoint
        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            // Parse response JSON
            const data = await response.json();

            // Display login message
            document.getElementById('login-message').innerText = data.message;

            // Redirect user to teacher dashboard if login successful
            if (data.success) {
                console.log('Login successful. Redirecting to teacher dashboard...');
                window.location.href = '/teacherDashboard.html';
            } else {
                console.log('Login failed. Please check your email and password.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            document.getElementById('login-message').innerText = 'An error occurred. Please try again later.';
        }
    });
});
