document.addEventListener("DOMContentLoaded", loadStudents);
document.getElementById("studentForm").addEventListener("submit", addStudent);
document.getElementById("logoutBtn").addEventListener("click", function() {
    fetch('/logout', { method: 'POST' })
        .then(() => {
            window.location.href = "login.html";
        });
});



function loadStudents() {
    fetch("http://localhost:3000/students")
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById("studentTable");
            data.forEach(student => {
                const row = table.insertRow();
                row.insertCell(0).textContent = student.studentId;
                row.insertCell(1).textContent = student.studentName;
                row.insertCell(2).textContent = student.quizTotal.toFixed(2);
                row.insertCell(3).textContent = student.assignment.toFixed(2);
                row.insertCell(4).textContent = student.finalExam.toFixed(2);
                row.insertCell(5).textContent = student.totalGrade.toFixed(2);
            });
        });
}

function addStudent(event) {
    event.preventDefault();
    
    const studentId = document.getElementById("studentId").value;
    const studentName = document.getElementById("studentName").value;
    const quiz1 = parseFloat(document.getElementById("quiz1").value);
    const quiz2 = parseFloat(document.getElementById("quiz2").value);
    const quiz3 = parseFloat(document.getElementById("quiz3").value);
    const assignment = parseFloat(document.getElementById("assignment").value);
    const finalExam = parseFloat(document.getElementById("finalExam").value);

    const quizTotal = quiz1 *0.1 + quiz2 * 0.1 + quiz3 * 0.1;
    const quizScore = quizTotal;
    const assignmentScore = assignment * 0.3;
    const finalExamScore = finalExam * 0.4;

    const totalGrade = quizScore + assignmentScore + finalExamScore;

    const student = {
        studentId,
        studentName,
        quizTotal,
        assignment,
        finalExam,
        totalGrade
    };

    fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(data => {
        const table = document.getElementById("studentTable");
        const row = table.insertRow();

        row.insertCell(0).textContent = data.studentId;
        row.insertCell(1).textContent = data.studentName;
        row.insertCell(2).textContent = data.quizTotal.toFixed(2);
        row.insertCell(3).textContent = data.assignment.toFixed(2);
        row.insertCell(4).textContent = data.finalExam.toFixed(2);
        row.insertCell(5).textContent = data.totalGrade.toFixed(2);

        document.getElementById("studentForm").reset();
    });
}
document.getElementById("searchForm").addEventListener("submit", searchStudent);

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
