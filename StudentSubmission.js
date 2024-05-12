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
    <td>${assignment.deadline ? new Date(assignment.deadline).toLocaleDateString() : 'N/A'}</td>
    <td>${assignment.deadline ? new Date(assignment.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</td>
    <td>${status}</td>
    <td>${assignment.subject}</td>
    <td>
        <button class="upload-button" 
                data-title="${assignment.title}" 
                data-detail="${assignment.details}" 
                ${assignment.fileLink ? `data-link="${assignment.fileLink}"` : ''}
                ${assignment.deadline ? `data-dueDate="${new Date(assignment.deadline).toLocaleDateString()}"` : ''}
                ${assignment.deadline ? `data-dueTime="${new Date(assignment.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}"` : ''}
                data-subject="${assignment.subject}">
            Upload
        </button>
    </td>
`;

    

        
       // Add event listeners to the upload buttons
const uploadButtons = document.querySelectorAll('.upload-button');
uploadButtons.forEach(button => {
    button.addEventListener('click', async () => {
        const assignmentTitle = button.getAttribute('data-title');
        const assignmentDetail = button.getAttribute('data-detail');
        const assignmentLink = button.getAttribute('data-link');
        const assignmentDueDate = button.getAttribute('data-dueDate');
        const assignmentDueTime = button.getAttribute('data-dueTime');
        const assignmentSubject = button.getAttribute('data-subject');
        console.log(`Upload button clicked for assignment: ${assignmentTitle}`);

        // Redirect to StudentEnglish.html with assignment data
        window.location.href = `StudentEnglish.html?title=${encodeURIComponent(assignmentTitle)}&detail=${encodeURIComponent(assignmentDetail)}&link=${encodeURIComponent(assignmentLink)}&dueDate=${encodeURIComponent(assignmentDueDate)}&dueTime=${encodeURIComponent(assignmentDueTime)}&subject=${encodeURIComponent(assignmentSubject)}`;
    });
});

    });
}
