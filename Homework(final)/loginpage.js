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


// /*DATABASE*/
// document.addEventListener('DOMContentLoaded', function() {
//     // Add event listener for form submission
//     document.getElementById('login-form').addEventListener('submit', async function(event) {
//         event.preventDefault(); // Prevent default form submission

//         // Get form data
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
        

//         // Send POST request to login endpoint
//         try {
//             console.log("fetch 8080")
//             const response = await fetch('http://localhost:3000/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password })
//             });

//             // Parse response JSON
//             const data = await response.json();
//             console.log("Response data:", data);


//             console.log("Role:", data.role);

//             // Display login message
//             document.getElementById('login-message').innerText = data.message;

//         //    // Check if login was successful
//         // if (data.success) {
//         //     console.log('Login successful. Redirecting to teacher dashboard...');
//         //     window.location.href = '/teacherDashboard.html'; // Redirect to the teacher dashboard page
//         // } else {
//         //     console.log('Login failed. Please check your email and password.');
//         // }
//         if (data.success) {
//             if (data.role === "Teacher") {
//                 console.log('Redirecting to teacher dashboard...');
//                 window.location.href = '/teacherDashboard.html'; // Redirect to the teacher dashboard page
//             } else if (data.role === "Student") {
//                 console.log('Redirecting to student dashboard...');
//                 window.location.href = '/StudentDashboard.html'; // Redirect to the student dashboard page
//             }
//         } else {
//             console.log('Login failed. Please check your email and password.');
//         }
        
//         } catch (error) {
//             console.error('An error occurred:', error);
//             document.getElementById('login-message').innerText = 'An error occurred. Please try again later.';
//         }
//     });
// });

// Add event listener for form submission
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Send POST request to login endpoint
    try {
        console.log("fetch 8080")
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        // Parse response JSON
        const data = await response.json();
        console.log("Response data:", data);

        // Check if the 'role' property is present in the response data
        if ('role' in data) {
            console.log("Role:", data.role);

            // Redirect based on the role
            if (data.role === "Teacher") {
                console.log('Redirecting to teacher dashboard...');
                window.location.href = '/teacherDashboard.html';
            } else if (data.role === "Student") {
                console.log('Redirecting to student dashboard...');
                window.location.href = '/StudentDashboard.html';
            } 
            else if (data.role === "Admin") {
            console.log('Redirecting to admin dashboard...');
            window.location.href = '/AdminDashboard.html';
            }else {
                console.log('Unknown role:', data.role);
                // Handle unknown role scenario
            }
        } else {
            console.log('Role is missing in the response data');
            // Handle missing role scenario
        }

        // Display login message
        document.getElementById('login-message').innerText = data.message;

    } catch (error) {
        console.error('An error occurred:', error);
        document.getElementById('login-message').innerText = 'An error occurred. Please try again later.';
    }
});



