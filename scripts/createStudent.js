async function createStudent() {
    const createstudentBtn = document.getElementById('studentSubmitBtn');
    createstudentBtn.innerHTML = 'Loading...'
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const studentQualification = document.getElementById('studentQualification').value;
    const studentEmail = document.getElementById('studentEmail').value;
    const studentContact = document.getElementById('studentContact').value;
    const Form = document.getElementById('studentForm')

    if ((!studentContact || !studentName) && (!studentId || !studentEmail) && !studentQualification) {
        custom_alert("warning", "Please Fill All the Fields...");
    }
    else {
        let data = {
            studentId: parseInt(studentId),
            studentName: studentName,
            qualification : studentQualification,
            studentEmail: studentEmail,
            contactNumber: parseInt(studentContact),
        };
        let result = await fetch("https://mentor-student-heroku.herokuapp.com/api/student/createStudent", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        if (result.status === 201) {
            custom_alert("success", "Student Created Successfully...");
        } else {
            custom_alert("Failure", "Unable to create student, Please check the details");
        }
        Form.reset();
    }

    createstudentBtn.innerHTML = 'Create student'
}
