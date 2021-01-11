const secrets = require("./secrets.json");
const {
    Pool
} = require("pg");
const pool = new Pool({
    user: secrets.dbUser,
    host: 'localhost',
    database: secrets.dbName,
    password: secrets.dbPassword,
    port: secrets.dbPort
})

const express = require("express");
const app = express();
const port = 3000

app.use(express.json());

const getTopics = (req, res) => {
    pool
        .query('SELECT * FROM topics ORDER BY topic_name  ')
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log(error);
            res.send('Oops.Try again please')
        })
}
app.get('/topics', getTopics);

const getClasses = (req, res) => {
    pool
        .query('SELECT * FROM classes ORDER BY classes_name  ')
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log(error);
            res.send('Oops.Try again please')
        })
}
app.get('/classes', getClasses);

const getStudents = (req, res) => {
    pool
        .query('SELECT * FROM students ORDER BY students_name  ')
        .then(result => res.send(result.rows))
        .catch(error => {
            console.log(error);
            res.send('Oops.Try again please')
        })
}
app.get('/students', getStudents);

const postStudent = (req, res) => {
    const {
        students_name,
        volunters_id
    } = req.body;
    const query = 'INSERT INTO students (students_name, volunters_assigned)  VALUES ($1, $2)';
    pool
        .query(query, [students_name, volunters_id])
        .then(() => res.send('Student created! 😉'))
        .catch(error => {
            console.log(error);
            res.send('Oops.We did it again. 😕')
        })
}
app.post("/students", postStudent);

const postClass = (req, res) => {
    const className = req.body.classes_name;
    const topicId = req.body.classes_topic;
    const startTime = req.body.start_time;
    const endTime = req.body.end_time;
    const query = 'INSERT INTO classes (classes_name, classes_topic, start_time, end_time) VALUES ($1, $2, $3, $4)';
    pool
        .query(query, [className, topicId, startTime, endTime])
        .then(() => res.send("Class created! 😉"))
        .catch(error => {
            console.log(error);
            res.send('Oops.We did it again. 😕')
        })
}
app.post("/classes", postClass);

const postTopic = (req, res) => {
    const topicName = req.body.topic_name;
    const query = 'INSERT INTO topics (topic_name)  VALUES ($1)';
    pool
        .query(query, [topicName])
        .then(() => res.send('Topic created! 😉'))
        .catch(error => {
            console.log(error);
            res.send('Oops.We did it again. 😕')
        })
}
app.post("/topics", postTopic);

const postStudentIntoClass = (req, res) => {
    const studentId = req.body.students_attending;
    const classId = req.body.classes_attending;
    const query = 'INSERT INTO students_clases (students_attending, classes_attending)  VALUES ($1, $2)';

    pool
        .query(query, [studentId, classId])
        .then(() => res.send('Student assigned to class! 😉'))
        .catch(error => {
            console.log(error);
            res.send('Oops.We did it again. 😕')
        })
}
app.post("/student-assigned-to-class", postStudentIntoClass);

// - get students by class id
const getStudentByClass = (request, response) => {
    const classId = request.params.classes_attending;
    pool
        .query("select * from students_clases where classes_attending = $1", [classId])
        .then((result) => response.json(result.rows))
        .catch((e) => console.error(e));
};
app.get("/getF/:classId", getStudentByClass);

app.listen(port, () => console.log(`SERVER LISTENING TO PORT : ${port}`))