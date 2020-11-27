let mentors = []
let students = []
let selectedstudent
let selectedmentor
let oldMentor

getMentors()

async function getMentors() {
    mentors.splice(0, mentors.length)
    const res = await fetch('https://mentor-student-heroku.herokuapp.com/api/mentor');
    const response = await res.json();
    response.forEach(mentor => {
        mentors.push(mentor);    
    })  
}


async function getStudents() {
    students.splice(0, students.length)
    const res = await fetch('https://mentor-student-heroku.herokuapp.com/api/student');
    const response = await res.json();
    response.forEach(student => {
        students.push(student);    
    })
    UpdateMentorTable()
}
getStudents();
// console.log(students)

const modaldiv = document.getElementById("my-container");
const modalSelect = document.createElement('div');
modalSelect.className ='modal'
modalSelect.id = 'SelectModal'
modalSelect.innerHTML = `
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title" style="color:black">Update Mentor to <span id="SelectedStudent"> ${selectedstudent}</span></h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div id="SelectStudentsToAssign" class="modal-body">
            
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
`
console.log(modaldiv)
// getStudents();
modaldiv.appendChild(modalSelect)

function listStudentsToSelect(){
    const selectGroupForm = document.getElementById('SelectStudentsToAssign');
    selectGroupForm.innerHTML="";
    if(mentors.length === 0){
        const option = document.createElement("div");
        option.className = 'form-group'
        option.innerHTML = ` 
            <button type="button" data-dismiss="modal"  style="letter-spacing: 3px;" class="btn btn-primary form-control">
                No Mentors Found
            </button>
        `
        selectGroupForm.appendChild(option);
    }else{
        mentors.forEach(mentor=>{
            const option = document.createElement("div");
            option.className = 'form-group'
            option.innerHTML = ` 
                <button type="button" data-dismiss="modal" value="${mentor.mentorName}" id="${mentor.mentorName}" onclick="selectedMentor_(this.value)" style="letter-spacing: 3px;" class="btn btn-primary form-control">
                    ${mentor.mentorName}
                </button>
            `
            selectGroupForm.appendChild(option);
        })
        
    }
}
function UpdateMentorTable(){
    const StudentsTableDiv = document.getElementById('update-mentor-table')

    StudentsTableDiv.innerHTML = ''
    const MentorsTable =document.createElement('table');
    MentorsTable.className = 'col-sm-12 table text-center';
    const TableHead = document.createElement('thead');
    TableHead.innerHTML = `
                    <th scope="col">Student ID</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Student Qualification</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Current Mentor</th>
                    <th scope="col">Update Mentor</th>
    `
    MentorsTable.appendChild(TableHead)
    
    students.forEach(student=>{
        
        if(student.mentorName === 'NA'){
        const mentorRow = document.createElement('tr');
        const mentorid = document.createElement('td')
        mentorid.className = 'align-middle';
        mentorid.innerHTML = student.studentId
        mentorRow.appendChild(mentorid);

        const mentorname = document.createElement('td')
        mentorname.className = 'align-middle';
        mentorname.innerHTML = student.studentName
        mentorRow.appendChild(mentorname);

        const studentQualification = document.createElement('td')
        studentQualification.className = 'align-middle';
        studentQualification.innerHTML = student.qualification
        mentorRow.appendChild(studentQualification);

        const mentorMbl = document.createElement('td')
        mentorMbl.className = 'align-middle';
        mentorMbl.innerHTML = student.contactNumber;
        mentorRow.appendChild(mentorMbl);

        const CurrentMentor = document.createElement('td')
        CurrentMentor.className = 'align-middle';
        CurrentMentor.innerHTML = student.mentorName;
        mentorRow.appendChild(CurrentMentor);

        const Assigncol = document.createElement('td')
        Assigncol.innerText =  "Not Applicable"
        mentorRow.appendChild(Assigncol);
        MentorsTable.appendChild(mentorRow);
        StudentsTableDiv.appendChild(MentorsTable);
    }
    else{
        const mentorRow = document.createElement('tr');
        const mentorid = document.createElement('td')
        mentorid.className = 'align-middle';
        mentorid.innerHTML = student.studentId
        mentorRow.appendChild(mentorid);

        const mentorname = document.createElement('td')
        mentorname.className = 'align-middle';
        mentorname.innerHTML = student.studentName
        mentorRow.appendChild(mentorname);

        const studentQualification = document.createElement('td')
        studentQualification.className = 'align-middle';
        studentQualification.innerHTML = student.qualification
        mentorRow.appendChild(studentQualification);

        const mentorMbl = document.createElement('td')
        mentorMbl.className = 'align-middle';
        mentorMbl.innerHTML = student.contactNumber;
        mentorRow.appendChild(mentorMbl);

        const CurrentMentor = document.createElement('td')
        CurrentMentor.className = 'align-middle';
        CurrentMentor.innerHTML = student.mentorName;
        mentorRow.appendChild(CurrentMentor);

        const Assigncol = document.createElement('td')
        Assigncol.innerHTML =  `
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#SelectModal">
             Update Mentor
        </button>
        `
        mentorRow.appendChild(Assigncol);
        MentorsTable.appendChild(mentorRow);
   
        Assigncol.addEventListener('click',()=>{
            const SelectedStudentName = document.getElementById('SelectedStudent');
            // SelectedStudentName.style.textTransform = 'capitalize';
            SelectedStudentName.innerHTML =  student.studentName;
            oldMentor = student.mentorName;
            selectedstudent = student.studentName;
            document.getElementById('SelectStudentsToAssign').innerHTML='Loading...'
            listStudentsToSelect()
        })
        StudentsTableDiv.appendChild(MentorsTable);
    }
    })
}


async function UpdateMentortoStudent() {
    let data = {
        newMentorName: selectedmentor,
        studentName: selectedstudent,
        oldMentorName: oldMentor
    }
    await fetch('https://mentor-student-heroku.herokuapp.com/api/mentor/updateMentor', {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}


function selectedMentor_(mentor){
    selectedmentor = mentor;
    UpdateMentortoStudent();
    custom_alert("success", "Assigned " + `${selectedstudent}` + " to " + `${selectedmentor}` );
    console.log(oldMentor)
    console.log(selectedmentor)
    console.log(selectedstudent)
    setTimeout(() => {
        document.location.href = "./UpdateMentor.html";
    }, 3500);
}