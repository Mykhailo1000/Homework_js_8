const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const getStudents = () => {
    if (fs.existsSync('students.json')) {
        const data = fs.readFileSync('students.json');
        return JSON.parse(data);
    }
    return [];
};

const saveStudents = (students) => {
    fs.writeFileSync('students.json', JSON.stringify(students, null, 2));
};

app.post('/students', (req, res) => {
    const students = getStudents();
    students.push(req.body);
    saveStudents(students);
    res.status(201).send(req.body);
});

app.get('/students', (req, res) => {
    const students = getStudents();
    res.send(students);
});

app.delete('/students/:index', (req, res) => {
    const students = getStudents();
    students.splice(req.params.index, 1);
    saveStudents(students);
    res.sendStatus(204);
});

app.put('/students/:index', (req, res) => {
    const students = getStudents();
    students[req.params.index] = req.body;
    saveStudents(students);
    res.send(req.body);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
