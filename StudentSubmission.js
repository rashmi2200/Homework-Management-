document.addEventListener('DOMContentLoaded', fetchAssignments);

async function fetchAssignments() {
    try {
        const response = await fetch('http://localhost:3000/student/assignments');
        if (!response.ok) {
            throw new Error('Failed to fetch assignments');
        }
        const assignments = await response.json();
        displayAssignments(assignments);
    } catch (error) {
        console.error('Error fetching assignments:', error);
    }
}

// Function to display assignments in a table
async function displayAssignments(assignments) {
    console.log(assignments); // Log the assignments variable to inspect its structure
    
    const tableBody = document.getElementById('assignments-table-body');
    tableBody.innerHTML = ''; // Clear existing content

    if (!Array.isArray(assignments)) {
        console.error('Assignments data is not an array');
        return;
    }

    assignments.forEach((assignment, index) => {
        const row = tableBody.insertRow(index);
        const formattedDate = new Date(assignment.deadline).toLocaleDateString();
        const formattedTime = new Date(assignment.deadline).toLocaleTimeString();
        let status;
        const assignmentDate = new Date(assignment.deadline);
        const currentDate = new Date();

        if (assignmentDate > currentDate) {
            status = 'Ongoing';
        } else if (assignmentDate < currentDate) {
            status = 'Completed';
        } else {
            status = 'Due Today';
        }

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${assignment.title}</td>
            <td>${assignment.details}</td>
            <td>${assignment.fileLink}</td>
            <td>${formattedDate}</td>
            <td>${formattedTime}</td>
            <td>${status}</td>
            <td>${assignment.subject}</td>
            <td><button class="upload-button" data-title="${assignment.title}" data-subject="${assignment.subject}">Upload</button></td>
        `;
    });
}
