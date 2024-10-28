document.getElementById("searchForm").addEventListener("submit", searchStudent);
document.getElementById("logoutBtn").addEventListener("click", function() {
    fetch('/logout', { method: 'POST' })
        .then(() => {
            window.location.href = "login.html";
        });
});

function searchStudent(event) {
    event.preventDefault();
    const studentId = document.getElementById("searchStudentId").value;

    fetch(`http://localhost:3000/students/${studentId}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Student not found");
            }
        })
        .then(student => {
            document.getElementById("resultStudentId").textContent = student.studentId;
            document.getElementById("resultStudentName").textContent = student.studentName;
            document.getElementById("resultLessonName").textContent = student.lessonName; 
            document.getElementById("resultQuizTotal").textContent = student.quizTotal.toFixed(2);
            document.getElementById("resultAssignment").textContent = student.assignment.toFixed(2);
            document.getElementById("resultFinalExam").textContent = student.finalExam.toFixed(2);
            document.getElementById("resultTotalGrade").textContent = student.totalGrade.toFixed(2);

            document.getElementById("studentResult").style.display = "block";
        })
        .catch(error => {
            alert(error.message);
            document.getElementById("studentResult").style.display = "none";
        });
}
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = "student"; 

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role })
    })
    .then(response => {
        if (!response.ok) throw new Error("Login failed");
        return response.json();
    })
    .then(student => {
        document.getElementById("resultStudentId").textContent = student.studentId;
        document.getElementById("resultStudentName").textContent = student.name;
        document.getElementById("resultStudentSurname").textContent = student.surname;
        document.getElementById("resultStudentPhone").textContent = student.phone;
        document.getElementById("resultStudentEmail").textContent = student.email;

        document.getElementById("studentResult").style.display = "block";
    })
    .catch(error => {
        alert(error.message);
    });
});
