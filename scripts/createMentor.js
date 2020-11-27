async function createMentor() {
    const createMentorBtn = document.getElementById('createMentorBtn');
    createMentorBtn.innerHTML = 'Loading...'
    const MentorId = document.getElementById('MentorId').value;
    const MentorName = document.getElementById('MentorName').value;
    const MentorEmail = document.getElementById('MentorEmail').value;
    const MentorContact = document.getElementById('MentorContact').value;
    const Form = document.getElementById('mentorForm')

    if ((!MentorContact || !MentorName) && (!MentorId || !MentorEmail)) {
        custom_alert("warning", "Please Fill All the Fields...");
    }
    else {
        let data = {
            mentorId: parseInt(MentorId),
            mentorName: MentorName,
            mentorEmail: MentorEmail,
            contactNumber: parseInt(MentorContact),
        };
        let result = await fetch("https://mentor-student-heroku.herokuapp.com/api/mentor/createMentor", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
    
        if (result.status === 201) {
            custom_alert("success", "Mentor Created Successfully...");
        } else {
            custom_alert("Failure", "Unable to create Mentor, Please check the details");
        }
        Form.reset();
    }

    createMentorBtn.innerHTML = 'Create Mentor'
}