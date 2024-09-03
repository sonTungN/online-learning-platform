document.addEventListener('DOMContentLoaded', function () {
    const instructorFields = document.getElementById('instructorFields');
    const instructorRadio = document.getElementById('instructor');
    const learnerRadio = document.getElementById('learner');

    function toggleInstructorFields() {
        if (instructorRadio.checked) {
            instructorFields.style.display = 'block';
        } else {
            instructorFields.style.display = 'none';
        }
    }

    // Listen for changes on the account type radios
    instructorRadio.addEventListener('change', toggleInstructorFields);
    learnerRadio.addEventListener('change', toggleInstructorFields);

    // Initialize the visibility on page load
    toggleInstructorFields();
});