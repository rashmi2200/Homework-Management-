// // Fetch assignments when the document is fully loaded
// document.addEventListener('DOMContentLoaded', fetchAssignments);

// // Function to fetch assignments
// async function fetchAssignments() {
//     try {
//         const response = await fetch('http://localhost:3000/assignments');
//         if (response.ok) {
//             const assignments = await response.json();
//             renderAssignments(assignments);
//         } else {
//             console.error('Failed to fetch assignments');
//         }
//     } catch (error) {
//         console.error('Error fetching assignments:', error);
//     }
// }

// // Render assignments in the table
// function renderAssignments(assignments) {
//     const tableBody = document.getElementById('assignmentsBody');
//     if (tableBody) {
//         tableBody.innerHTML = ''; // Clear existing content
        
//         // Create table headings
//         const headingsRow = `<tr>
//                                 <th>ID</th>
//                                 <th>Title</th>
//                                 <th>Details</th>
//                                 <th>File Link</th>
//                                 <th>Due Date</th>
//                                 <th>Due Time</th>
//                                 <th>Status</th>
//                                 <th>Subject</th>
//                              </tr>`;
//         tableBody.innerHTML += headingsRow;

//         // Counter variable for ID
//         let idCounter = 1;

//         // Get current date and time
//         const currentDate = new Date();

//         // Sort assignments based on due date and time in descending order
//         assignments.sort((a, b) => {
//             const dateA = new Date(a.deadline);
//             const dateB = new Date(b.deadline);
//             if (dateA > dateB) return -1; // Sort in descending order
//             if (dateA < dateB) return 1; // Sort in descending order
//             return 0;
//         });

//         // Iterate over assignments and populate table rows
//         assignments.forEach(assignment => {
//             const formattedDate = new Date(assignment.deadline).toLocaleDateString();
//             const formattedTime = new Date(assignment.deadline).toLocaleTimeString();

//             // Determine status
//             let status;
//             const assignmentDate = new Date(assignment.deadline);
//             if (assignmentDate > currentDate) {
//                 status = 'Ongoing';
//             } else if (assignmentDate < currentDate) {
//                 status = 'Completed';
//             } else {
//                 status = 'Due Today';
//             }

//             const row = `<tr>
//                             <td>${idCounter}</td>
//                             <td>${assignment.title}</td>
//                             <td>${assignment.details}</td>
//                             <td>${assignment.fileLink}</td>
//                             <td>${formattedDate}</td>
//                             <td>${formattedTime}</td>
//                             <td>${status}</td>
//                             <td>${assignment.subject}</td>
//                         </tr>`;
//             tableBody.innerHTML += row;
            
//             // Increment ID counter
//             idCounter++;
//         });
//     } else {
//         console.error('Table body element not found');
//     }
// }
document.addEventListener('DOMContentLoaded', fetchAssignments);

async function fetchAssignments() {
    try {
        const response = await fetch('http://localhost:3000/assignments');
        if (response.ok) {
            const assignments = await response.json();
            renderAssignments(assignments);
        } else {
            console.error('Failed to fetch assignments');
        }
    } catch (error) {
        console.error('Error fetching assignments:', error);
    }
}

function renderAssignments(assignments) {
    const tableBody = document.getElementById('assignmentsBody');
    if (tableBody) {
        tableBody.innerHTML = ''; // Clear existing content
        
        const headingsRow = `<tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Details</th>
                                <th>File Link</th>
                                <th>Due Date</th>
                                <th>Due Time</th>
                                <th>Status</th>
                                <th>Subject</th>
                                <th>Edit</th>
                             </tr>`;
        tableBody.innerHTML += headingsRow;

        let idCounter = 1;
        const currentDate = new Date();

        assignments.sort((a, b) => {
            const dateA = new Date(a.deadline);
            const dateB = new Date(b.deadline);
            if (dateA > dateB) return -1;
            if (dateA < dateB) return 1;
            return 0;
        });

        assignments.forEach(assignment => {
            const formattedDate = new Date(assignment.deadline).toLocaleDateString();
            const formattedTime = new Date(assignment.deadline).toLocaleTimeString();
            let status;
            const assignmentDate = new Date(assignment.deadline);
            if (assignmentDate > currentDate) {
                status = 'Ongoing';
            } else if (assignmentDate < currentDate) {
                status = 'Completed';
            } else {
                status = 'Due Today';
            }

            const row = `<tr>
                            <td>${idCounter}</td>
                            <td>${assignment.title}</td>
                            <td>${assignment.details}</td>
                            <td>${assignment.fileLink}</td>
                            <td>${formattedDate}</td>
                            <td>${formattedTime}</td>
                            <td>${status}</td>
                            <td>${assignment.subject}</td>
                            <td><button class="edit-button" data-title="${assignment.title}" data-subject="${assignment.subject}">Edit</button></td>
                        </tr>`;
            tableBody.innerHTML += row;
            idCounter++;
        });
        
  // Add event listeners to the edit buttons
const editButtons = document.querySelectorAll('.edit-button');
editButtons.forEach(button => {
    button.addEventListener('click', () => {
        const title = button.getAttribute('data-title');
        const subject = button.getAttribute('data-subject');
        
        // Display a message to the user before redirection
        alert(`Editing assignment: Title - ${title}, Subject - ${subject}`);
        
        // Redirect to the edit portal
        window.location.href = `TeacherEdit.html?title=${title}&subject=${subject}`;
    });
});

}
}