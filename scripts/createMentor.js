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

function custom_alert(type, message) {
    let newAlert = $("#message");
    newAlert.html(`
    <div class="fade-in text-center m-0 alert alert-${type} alert-dismissible fade show" role="alert">
    ${message}
    <button type="button" class="close" data-dismiss="alert" onclick="close()" aria-label="Close">
       <span aria-hidden="true">&times;</span>
    </button>
    <br>
    </div>`);
    setTimeout(() => {
        newAlert.html("");
    }, 3000);
}

var mybutton = document.getElementById("myBtn");
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    }
    else {
        mybutton.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}