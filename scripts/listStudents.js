let mentors = [];

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


function AssignMentorTable(){
    const MentorsTableDiv = document.getElementById('list-students-table')

    MentorsTableDiv.innerHTML = ''
    const MentorsTable =document.createElement('table');
    MentorsTable.className = 'col-sm-12 table text-center';
    const TableHead = document.createElement('thead');
    TableHead.innerHTML = `
                    <th scope="col">Mentor ID</th>
                    <th scope="col">Mentor Name</th>
                    <th scope="col">Mentor Email</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Students</th>
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

        const HisStudents = document.createElement('td')
        if(mentor.students.length === 0){
            HisStudents.innerHTML =  "No Students Assigned"
        }else{

            HisStudents.innerHTML =  `${mentor.students}`
        }
        mentorRow.appendChild(HisStudents);
        MentorsTable.appendChild(mentorRow);
    })
    MentorsTableDiv.appendChild(MentorsTable)
}