let currentRole = 'student';

document.getElementById('studentBtn').addEventListener('click', function() {
    currentRole = 'student';
    this.classList.add('active');
    document.getElementById('teacherBtn').classList.remove('active');
});

document.getElementById('teacherBtn').addEventListener('click', function() {
    currentRole = 'teacher';
    this.classList.add('active');
    document.getElementById('studentBtn').classList.remove('active');
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role: currentRole }), 
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        const redirectUrl = data.role === 'teacher' ? 'teacher_dashboard.html' : 'student_dashboard.html';
        window.location.href = redirectUrl;
    })
    .catch(error => {
        const loginMessage = document.getElementById('loginMessage');
        loginMessage.textContent = 'Invalid username, password, or role. Please try again.';
        loginMessage.style.display = 'block';
    });
});
