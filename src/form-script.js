document.getElementById('contact-form').addEventListener('submit', function (e) {
    let valid = true;

    // Validate Name
    const name = document.getElementById('name').value;
    if (!/^[A-Za-z\s]{3,}$/.test(name)) {
        alert('Name must contain at least three letters.');
        valid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value;
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address.');
        valid = false;
    }

    // Validate Phone
    const preferredContactMethod = document.querySelector('input[name="preferred-contact-method"]:checked').value;
    const phone = document.getElementById('phone').value;
    if (preferredContactMethod === 'phone' && !/^\d{9,11}$/.test(phone)) {
        alert('Phone must contain between 9 and 11 digits.');
        valid = false;
    }

    // Validate Contact Days
    const contactDays = document.querySelectorAll('input[name="contact-days"]:checked');
    if (contactDays.length === 0) {
        alert('Please select at least one contact day.');
        valid = false;
    }

    // Validate Message
    const message = document.getElementById('message').value;
    if (message.length < 50 || message.length > 500) {
        alert('Message must contain between 50 and 500 letters.');
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
    }
});
