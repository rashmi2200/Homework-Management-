// Fetch graded assignments from the server
async function fetchGradedAssignments() {
    try {
        const response = await fetch('http://localhost:3000/graded_assignments');
        if (response.ok) {
            const gradedAssignments = await response.json();
            displayGradedAssignments(gradedAssignments);
        } else {
            console.error('Failed to fetch graded assignments');
        }
    } catch (error) {
        console.error('Error fetching graded assignments:', error);
    }
}

// Display fetched graded assignments in the grading panel
function displayGradedAssignments(gradedAssignments) {
    const tableBody = document.querySelector('.student-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    gradedAssignments.forEach(assignment => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${assignment.title}</td>
            <td>${assignment.subject}</td>
            <td>${formatDate(assignment.submittedAt)}</td>
            <td>
                <button class="grade-button">Grade</button>
                <div class="grade-dropdown">
                    <span class="selected-grade"></span> <!-- Placeholder for selected grade -->
                    <div class="dropdown-content">
                        <a href="#" data-grade="A+">A+</a>
                        <a href="#" data-grade="A">A</a>
                        <a href="#" data-grade="B+">B+</a>
                        <a href="#" data-grade="B">B</a>
                        <a href="#" data-grade="C+">C+</a>
                        <a href="#" data-grade="C">C</a>
                        <a href="#" data-grade="D+">D+</a>
                        <a href="#" data-grade="D">D</a>
                    </div>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Format date to display only the date part
function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
}

// Event listener for the Grade button and dropdown
document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('grade-button')) {
        const dropdown = target.nextElementSibling;
        dropdown.classList.toggle('show-dropdown');
    }
    if (!target.classList.contains('grade-button') && !target.classList.contains('dropdown-content')) {
        const dropdowns = document.querySelectorAll('.grade-dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show-dropdown');
        });
    }
});

// Event listener for selecting grade from dropdown
document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.matches('.dropdown-content a')) {
        const grade = target.dataset.grade;
        const selectedGrade = target.parentElement.parentElement.previousElementSibling;
        const isFinal = confirm(`Is ${grade} your final grade?`);
        if (isFinal) {
            selectedGrade.textContent = grade;
            selectedGrade.classList.add('selected');
        }
        const dropdown = target.parentElement.parentElement;
        dropdown.classList.remove('show-dropdown');
    }
});

// Call fetchGradedAssignments when the page loads
window.addEventListener('load', fetchGradedAssignments);
