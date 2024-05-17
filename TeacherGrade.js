// // Fetch graded assignments from the server
// async function fetchGradedAssignments() {
//     try {
//         const response = await fetch('http://localhost:3000/graded_assignments');
//         if (response.ok) {
//             const gradedAssignments = await response.json();
//             displayGradedAssignments(gradedAssignments);
//         } else {
//             console.error('Failed to fetch graded assignments');
//         }
//     } catch (error) {
//         console.error('Error fetching graded assignments:', error);
//     }
// }

// // Display fetched graded assignments in the grading panel
// function displayGradedAssignments(gradedAssignments) {
//     const tableBody = document.querySelector('.student-table tbody');
//     tableBody.innerHTML = ''; // Clear existing rows

//     gradedAssignments.forEach(assignment => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${assignment.title}</td>
//             <td>${assignment.subject}</td>
//             <td>${formatDate(assignment.submittedAt)}</td>
//             <td>
//                 <button class="grade-button">Grade</button>
//                 <div class="grade-dropdown">
//                     <span class="selected-grade"></span> <!-- Placeholder for selected grade -->
//                     <div class="dropdown-content">
//                         <a href="#" data-grade="A+">A+</a>
//                         <a href="#" data-grade="A">A</a>
//                         <a href="#" data-grade="B+">B+</a>
//                         <a href="#" data-grade="B">B</a>
//                         <a href="#" data-grade="C+">C+</a>
//                         <a href="#" data-grade="C">C</a>
//                         <a href="#" data-grade="D+">D+</a>
//                         <a href="#" data-grade="D">D</a>
//                     </div>
//                 </div>
//             </td>
//         `;
//         tableBody.appendChild(row);
//     });
// }

// // Format date to display only the date part
// function formatDate(dateString) {
//     const date = new Date(dateString);
//     const formattedDate = date.toLocaleDateString();
//     return formattedDate;
// }

// // Event listener for the Grade button and dropdown
// document.addEventListener('click', function(event) {
//     const target = event.target;
//     if (target.classList.contains('grade-button')) {
//         const dropdown = target.nextElementSibling;
//         dropdown.classList.toggle('show-dropdown');
//     }
//     if (!target.classList.contains('grade-button') && !target.classList.contains('dropdown-content')) {
//         const dropdowns = document.querySelectorAll('.grade-dropdown');
//         dropdowns.forEach(dropdown => {
//             dropdown.classList.remove('show-dropdown');
//         });
//     }
// });



// // Call fetchGradedAssignments when the page loads
// window.addEventListener('load', fetchGradedAssignments);

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
            <td>${assignment.file}</td>
            <td>
                <button class="grade-button">Grade</button>
                <div class="grade-dropdown">
                    <span class="selected-grade">${getStoredGrade(assignment.title)}</span> <!-- Placeholder for selected grade -->
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

// Retrieve stored grade from local storage
function getStoredGrade(title) {
    return localStorage.getItem(title) || '';
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

document.addEventListener('click', async function(event) {
    const target = event.target;
    if (target.matches('.dropdown-content a')) {
        const grade = target.dataset.grade;

        // Traverse up the DOM to find the corresponding row
        const row = target.closest('tr');
        if (row) {
            // Access the cells directly from the row
            const cells = row.querySelectorAll('td');
            if (cells.length >= 4) { // Ensure at least 4 cells are present
                const assignmentTitle = cells[0].textContent.trim();
                const subject = cells[1].textContent.trim();
                const submittedDate = cells[2].textContent.trim();
                const fileLink = cells[3].querySelector('a').href; // Assuming a link element for the file

                // Prompt confirmation only if the selected grade is not already the final grade
                if (!row.classList.contains('selected')) {
                    const isFinal = confirm(`Is ${grade} your final grade?`);
                    if (isFinal) {
                        // Call function to save grade to the backend
                        try {
                            const response = await fetch('http://localhost:3000/save_grade', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    title: assignmentTitle,
                                    subject: subject,
                                    submittedDate: submittedDate,
                                    fileLink: fileLink, // Include the file link in the request
                                    grade: grade
                                    
                                })
                            });
                            if (response.ok) {
                                console.log('Grade saved successfully');
                                // Update the displayed grade in the DOM
                                const gradeDropdown = target.closest('.grade-dropdown');
                                const selectedGradeElement = gradeDropdown.querySelector('.selected-grade');
                                if (selectedGradeElement) {
                                    selectedGradeElement.textContent = grade;
                                    // Store the grade in local storage
                                    localStorage.setItem(assignmentTitle, grade);
                                }
                            } else {
                                console.error('Failed to save grade');
                            }
                        } catch (error) {
                            console.error('Error saving grade:', error);
                        }
                    }
                }
            } else {
                console.error('One or more cells are missing.');
            }
        } else {
            console.error('Parent row not found.');
        }
    }
});

// Call fetchGradedAssignments when the page loads
window.addEventListener('load', fetchGradedAssignments);

