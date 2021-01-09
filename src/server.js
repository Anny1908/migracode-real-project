const secrets = require("./secrets");
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

app.get("/topics", function(req, res) {
    pool.query('SELECT * FROM topics', (result, error) => {
        res.json(result.rows);
        console.log(res);
    });
});

app.get("/classes", function(req, res) {
    pool.query('SELECT * FROM classes', (result, error) => {
        res.json(result.rows);
    });
});

app.get("/students", function(req, res) {
    pool.query('SELECT * FROM students', (result, error) => {
        res.json(result.rows);
        console.log(result.rows);
    });
});

app.post("/hotels", function(req, res) {
            const newHotelName = req.body.name;
            const newHotelRooms = req.body.rooms;
            const newHotelPostcode = req.body.postcode;











            app.listen(port, () => console.log(`SERVER LISTENING TO PORT : ${port}`))