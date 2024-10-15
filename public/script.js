const studentForm = document.getElementById('student-form');
const studentsTableBody = document.getElementById('table-body');
const searchInput = document.getElementById('search');

studentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const student = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        age: document.getElementById('age').value,
        course: document.getElementById('course').value,
        faculty: document.getElementById('faculty').value,
        subjects: document.getElementById('subjects').value.split(',').map(s => s.trim()),
    };

    await fetch('/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
    });

    loadStudents();
    studentForm.reset();
});

const loadStudents = async () => {
    const response = await fetch('/students');
    const students = await response.json();
    displayStudents(students);
};

const displayStudents = (students) => {
    studentsTableBody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.age}</td>
            <td>${student.course}</td>
            <td>${student.faculty}</td>
            <td>${student.subjects.join(', ')}</td>
            <td>
                <button onclick="deleteStudent(${index})">Видалити</button>
                <button onclick="editStudent(${index})">Редагувати</button>
            </td>
        `;
        studentsTableBody.appendChild(row);
    });
};

const deleteStudent = async (index) => {
    await fetch(`/students/${index}`, { method: 'DELETE' });
    loadStudents();
};

const editStudent = (index) => {
};

searchInput.addEventListener('input', async () => {
    const searchValue = searchInput.value.toLowerCase();
    const response = await fetch('/students');
    const students = await response.json();
    const filteredStudents = students.filter(student => student.surname.toLowerCase().includes(searchValue));
    displayStudents(filteredStudents);
});

loadStudents();
