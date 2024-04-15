
    document.addEventListener('DOMContentLoaded', function () {
        var gradeDropdown = document.querySelector('.grade-dropdown');
        var selectedGradeSpan = document.querySelector('.selected-grade');

        gradeDropdown.addEventListener('click', function (event) {
            if (event.target.tagName === 'A') {
                var selectedGrade = event.target.getAttribute('data-grade');
                selectedGradeSpan.textContent = selectedGrade; // Update selected grade span
            }
        });
    });

