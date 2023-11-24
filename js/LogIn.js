// login.js
function submitForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("pass").value;

    // Create an object with the login credentials
    var credentials = {
        email: email,
        password: password
    };

    // Send the login credentials to the server
    fetch('/login', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response from the server
        console.log(data);
        if (data.success) {
            // Redirect to the main page if login is successful
            window.location.href = 'Main.html';
        } else {
            // Display an error message or take other actions
            alert('Login failed. Please check your credentials.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
