let mentors = [];
let students = [];
let selectedmentor
let selectedStudentName
let StudentsWithNoMentors = []

getMentors()

async function getMentors() {
    mentors.splice(0, mentors.length)
    const res = await fetch('https://mentor-student-heroku.herokuapp.com/api/mentor');
    const response = await res.json();
    response.forEach(mentor => {
        mentors.push(mentor);    
    })  
    AssignMentorTable()
}

// console.log(mentors)

async function getStudents() {
    students.splice(0, students.length)
    const res = await fetch('https://mentor-student-heroku.herokuapp.com/api/student');
    const response = await res.json();
    response.forEach(student => {
        students.push(student);    
    })
}
getStudents();

const modaldiv = document.getElementById("my-container");
const modalSelect = document.createElement('div');
modalSelect.className ='modal'
modalSelect.id = 'SelectModal'
modalSelect.innerHTML = `
<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <h4 class="modal-title" style = "color : black">Assign Student to <span id="SelectedMentor"> ${selectedmentor}</span></h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>
        <div id="SelectStudentsToAssign" class="modal-body">
            Modal body..
        </div>
        <!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>
    </div>
</div>
`
// console.log(modaldiv)
// getStudents();
modaldiv.appendChild(modalSelect)
// listStudentsToSelect()
function AssignMentorTable(){
    const MentorsTableDiv = document.getElementById('assign-mentor-table')

    MentorsTableDiv.innerHTML = ''
    const MentorsTable = document.createElement('table');
    // MentorsTable.classList.add('')
    MentorsTable.className = 'col-sm-12 table text-center text-white';
    const TableHead = document.createElement('thead');
    
    TableHead.innerHTML = `
                    <th scope="col">Mentor ID</th>
                    <th scope="col">Mentor Name</th>
                    <th scope="col">Mentor Email</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">No. of Students Assigned</th>
                    <th scope="col">Add Student</th>
    `
    MentorsTable.appendChild(TableHead)
    

    mentors.forEach(mentor=>{
        const mentorRow = document.createElement('tr');
        const mentorid = document.createElement('td')
        mentorid.className = 'align-middle';
        mentorid.innerHTML = mentor.mentorId
        mentorRow.appendChild(mentorid);

        const mentorName = document.createElement('td')
        mentorName.className = 'align-middle';
        mentorName.innerHTML = mentor.mentorName
        mentorRow.appendChild(mentorName);

        const mentorEmail = document.createElement('td')
        mentorEmail.className = 'align-middle';
        mentorEmail.innerHTML = mentor.mentorEmail
        mentorRow.appendChild(mentorEmail);

        const mentorMbl = document.createElement('td')
        mentorMbl.className = 'align-middle';
        mentorMbl.innerHTML = mentor.contactNumber;
        mentorRow.appendChild(mentorMbl);

        const noOfStudentsUnder = document.createElement('td')
        noOfStudentsUnder.className = 'align-middle';
        noOfStudentsUnder.innerHTML = mentor.students.length
        mentorRow.appendChild(noOfStudentsUnder);
        const Assigncol = document.createElement('td')
        Assigncol.innerHTML =  `
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#SelectModal">
             Add Student
        </button>
        `
        mentorRow.appendChild(Assigncol);
        MentorsTable.appendChild(mentorRow);
        
        Assigncol.addEventListener('click',()=>{
            const SelectedMentorName = document.getElementById('SelectedMentor');
            // SelectedMentorName.style.textTransform = 'uppercase';
            SelectedMentorName.innerHTML =  mentor.mentorName;
            selectedmentor = mentor.mentorName;
            document.getElementById('SelectStudentsToAssign').innerHTML='Loading...'
            listStudentsToSelect()
        })
    })
    MentorsTableDiv.appendChild(MentorsTable)
}


function listStudentsToSelect(){
    const selectGroupForm = document.getElementById('SelectStudentsToAssign');
    selectGroupForm.innerHTML="";
    if(students.length === 0){
        const option = document.createElement("div");
        option.className = 'form-group'
        option.innerHTML = ` 
            <button type="button" data-dismiss="modal"  style="letter-spacing: 3px;" class="btn btn-primary form-control">
                No Students Found
            </button>
        `
        selectGroupForm.appendChild(option);
    }else{
        StudentsWithNoMentors.splice(0, StudentsWithNoMentors.length)
        students.forEach(student=>{
            if(student.isMentorAssigned === false){
                StudentsWithNoMentors.push(student.studentName)
                }
            }
         )
        if(StudentsWithNoMentors.length !== 0){
            for(let i=0;i<StudentsWithNoMentors.length;i++){
                const option = document.createElement("div");
                option.className = 'form-group'
                option.innerHTML = ` 
                    <button type="button" data-dismiss="modal" value="${StudentsWithNoMentors[i]}" id="${StudentsWithNoMentors[i]}" onclick="selectedStudent_(this.value)" style="letter-spacing: 3px;" class="btn btn-primary form-control">
                        ${StudentsWithNoMentors[i]}
                    </button>
                `
                selectGroupForm.appendChild(option);
            }

        }
        else{
            const option = document.createElement("div");
            option.className = 'form-group'
            option.innerHTML = ` 
                <button type="button" data-dismiss="modal"  style="letter-spacing: 3px;" class="btn btn-primary form-control">
                    All Students are Assigned
                </button>
            `
            selectGroupForm.appendChild(option);
        }
        
    }
}

async function addStudenttoMentor() {
    let data = {
        mentorName: selectedmentor,
        studentName: selectedStudentName
    }
    await fetch('https://mentor-student-heroku.herokuapp.com/api/mentor/assignStudent', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

function selectedStudent_(student){
    selectedStudentName = student;
    addStudenttoMentor();
    custom_alert("success", "Assigned " + `${selectedStudentName}` + " to " + `${selectedmentor}` );
    setTimeout(() => {
        document.location.href = "./AssignMentor.html";
    }, 3500);
}