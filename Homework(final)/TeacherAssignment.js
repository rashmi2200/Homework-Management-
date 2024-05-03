let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();
 
const day = document.querySelector(".calendar-dates");
 
const currdate = document.querySelector(".calendar-current-date");
 
const prevIcon = document.getElementById("calendar-prev");
const nextIcon = document.getElementById("calendar-next");
 
// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
 
// Function to generate the calendar
const manipulate = () => {
 
    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();
 
    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();
 
    // Get the day of the last date of the month
    let dayend = new Date(year, month, lastdate).getDay();
 
    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();
 
    // Variable to store the generated calendar HTML
    let lit = "";
 
    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }
 
    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
 
        // Check if the current date is today
        let isToday = i === date.getDate()
            && month === new Date().getMonth()
            && year === new Date().getFullYear()
            ? "active"
            : "";
        lit += `<li class="${isToday}">${i}</li>`;
    }
 
    // Loop to add the first dates of the next month
    for (let i = dayend; i < 6; i++) {
        lit += `<li class="inactive">${i - dayend + 1}</li>`
    }
 
    // Update the text of the current date element 
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;
 
    // update the HTML of the dates element 
    // with the generated calendar
    day.innerHTML = lit;
}
 
manipulate();
 
// Attach click event listeners to navigation icons
prevIcon.addEventListener("click", () => {
    month--;
    if (month < 0) {
        year--;
        month = 11;
    }
    manipulate();
});

nextIcon.addEventListener("click", () => {
    month++;
    if (month > 11) {
        year++;
        month = 0;
    }
    manipulate();
});




// for the database purpose of create assignment 
// document.getElementById('createAssignmentBtn').addEventListener('click', async function() {
//     const assignmentTitle = document.getElementById('assignmentTitle').value;
//     const assignmentDetails = document.getElementById('assignmentDetails').value;
//     const assignmentFileLink = document.getElementById('assignmentFileLink').value;
//     const deadlineDate = document.getElementById('deadlineDate').value;
//     const deadlineTime = document.getElementById('deadlineTime').value;
//     const subject = document.getElementById('subjectDropdown').value;

//     const assignmentData = {
//         title: assignmentTitle,
//         details: assignmentDetails,
//         fileLink: assignmentFileLink,
//         deadline: {
//             date: deadlineDate,
//             time: deadlineTime
//         },
//         subject: subject
//     };

//     try {
//         const response = await fetch('/createAssignment', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(assignmentData)
//         });

//         if (response.ok) {
//             // Assignment created successfully
//             console.log('Assignment created successfully');
//         } else {
//             // Error creating assignment
//             console.error('Failed to create assignment');
//         }
//     } catch (error) {
//         console.error('Error creating assignment:', error);
//     }
// });
// Add event listener for form submission
document.getElementById('createAssignmentBtn').addEventListener('click', async function(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    const title = document.getElementById('assignmentTitle').value;
    const details = document.getElementById('assignmentDetails').value;
    const fileLink = document.getElementById('assignmentFileLink').value;
    const deadlineDate = document.getElementById('deadlineDate').value;
    const deadlineTime = document.getElementById('deadlineTime').value;
    const subject = document.getElementById('subjectDropdown').value;

    // Combine date and time into a single deadline string
    const deadline = new Date(`${deadlineDate}T${deadlineTime}`);

    // Prepare assignment data to send in the request body
    const assignmentData = {
        title,
        details,
        fileLink,
        deadline,
        subject
    };

    // Send POST request to create assignment
    try {
        const response = await fetch('http://localhost:3000/createAssignment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(assignmentData)
        });

        // Check if request was successful
        if (response.ok) {
            const data = await response.json();
            console.log(data.message); // Log success message
            // Show pop-up saying "Assignment Created Successfully"
            alert('Assignment Created Successfully');
        } else {
            console.error('Failed to create assignment');
            // Optionally, you can display an error message to the user
        }
    } catch (error) {
        console.error('Error creating assignment:', error);
        // Optionally, you can display an error message to the user
    }
});