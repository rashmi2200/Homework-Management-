// document.addEventListener('DOMContentLoaded', () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const title = urlParams.get('title');
//     const subject = urlParams.get('subject');

//     console.log('Title:', title);
//     console.log('Subject:', subject);

//     if (title && subject) {
//         // Replace the existing fetch request with the updated one here
//         fetch(`http://localhost:3000/assignment?title=${title}&subject=${subject}`)
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch assignment data');
//                 }
//                 return response.json();
//             })
//             .then(assignment => {
//                 console.log('Received assignment:', assignment);
//                 if (!assignment) {
//                     console.error('No assignment found for the specified title and subject');
//                     return;
//                 }
//                 populateFormFields(assignment);
//             })
//             .catch(error => {
//                 console.error('Error fetching assignment:', error);
//             });
//     } else {
//         console.error('Title or subject missing in URL parameters');
//     }
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('title');
    const subject = urlParams.get('subject');

    console.log('Title:', title);
    console.log('Subject:', subject);

    if (title && subject) {
        fetch(`http://localhost:3000/assignment?title=${title}&subject=${subject}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch assignment data');
                }
                return response.json();
            })
            .then(assignment => {
                console.log('Received assignment:', assignment);
                if (!assignment) {
                    console.error('No assignment found for the specified title and subject');
                    return;
                }
                populateFormFields(assignment);

                document.getElementById('createAssignmentBtn').addEventListener('click', () => {
                    const assignmentData = {
                        title: document.getElementById('assignmentTitle').value,
                        details: document.getElementById('assignmentDetails').value,
                        fileLink: document.getElementById('assignmentFileLink').value,
                        deadline: document.getElementById('deadlineDate').value + ' ' + document.getElementById('deadlineTime').value,
                        subject: document.getElementById('subjectDropdown').value
                    };
                
                    console.log('Sending assignment data:', assignmentData); // Log assignmentData
                
                    fetch(`http://localhost:3000/update_assignment`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(assignmentData)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to update assignment data');
                        }
                        return response.json();
                    })
                    .then(updatedAssignment => {
                        console.log('Assignment updated successfully:', updatedAssignment);
                        alert('Assignment updated successfully!');
                    })
                    .catch(error => {
                        console.error('Error updating assignment:', error);
                        alert('Failed to update assignment. Please try again later.');
                    });
                });
                
            })
            .catch(error => {
                console.error('Error fetching assignment:', error);
            });
    } else {
        console.error('Title or subject missing in URL parameters');
    }
});



    
    function populateFormFields(assignment) {
    const assignmentTitleField = document.getElementById('assignmentTitle');
    if (assignmentTitleField) {
        assignmentTitleField.value = assignment.title || '';
    } else {
        console.error('Assignment title field not found');
    }

    const assignmentDetailsField = document.getElementById('assignmentDetails');
    if (assignmentDetailsField) {
        assignmentDetailsField.value = assignment.details || '';
    } else {
        console.error('Assignment details field not found');
    }

    const assignmentFileLinkField = document.getElementById('assignmentFileLink');
    if (assignmentFileLinkField) {
        assignmentFileLinkField.value = assignment.fileLink || '';
    } else {
        console.error('Assignment file link field not found');
    }

    const deadlineDateField = document.getElementById('deadlineDate');
    if (deadlineDateField) {
        if (assignment.deadline) {
            const deadlineDate = new Date(assignment.deadline);
            deadlineDateField.valueAsDate = deadlineDate;
        } else {
            deadlineDateField.value = ''; // Clear the field if deadline is null or undefined
        }
    } else {
        console.error('Deadline date field not found');
    }

    const deadlineTimeField = document.getElementById('deadlineTime');
    if (deadlineTimeField) {
        if (assignment.deadline) {
            const deadlineDate = new Date(assignment.deadline);
            const hours = deadlineDate.getHours().toString().padStart(2, '0');
            const minutes = deadlineDate.getMinutes().toString().padStart(2, '0');
            deadlineTimeField.value = `${hours}:${minutes}`;
        } else {
            deadlineTimeField.value = ''; // Clear the field if deadline is null or undefined
        }
    } else {
        console.error('Deadline time field not found');
    }

    const subjectDropdown = document.getElementById('subjectDropdown');
    if (subjectDropdown) {
        subjectDropdown.value = assignment.subject || '';
    } else {
        console.error('Subject dropdown field not found');
    }
}






    
    // Function to generate the calendar
    const manipulate = () => {
        // Get references to DOM elements
        const day = document.querySelector(".calendar-dates");
        const currdate = document.querySelector(".calendar-current-date");

        // Logic to manipulate the calendar...
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        
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
    };

    // Attach click event listeners to navigation icons
    const prevIcon = document.getElementById("calendar-prev");
    const nextIcon = document.getElementById("calendar-next");

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

    manipulate(); // Call manipulate function once after DOMContentLoaded

