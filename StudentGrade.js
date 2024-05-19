// Function to fetch graded assignments from the server
async function fetchGradesAssignments() {
    try {
        const response = await fetch('http://localhost:3000/grades_assignments');
        if (response.ok) {
            const gradesAssignments = await response.json();
            displayGradedAssignments(gradesAssignments);
        } else {
            console.error('Failed to fetch graded assignments');
        }
    } catch (error) {
        console.error('Error fetching graded assignments:', error);
    }
}

// Display fetched graded assignments in the grading panel
function displayGradedAssignments(gradesAssignments) {
    const tableBody = document.querySelector('.students-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    gradesAssignments.forEach(assignment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${assignment.title}</td>
            <td>${assignment.subject}</td>
            <td>${formatDate(assignment.submittedDate)}</td>
            <td>${assignment.grade}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Format date to display only the date part
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString();
}

// Fetch graded assignments when the page loads
window.addEventListener('load', fetchGradesAssignments);
