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

app.listen(port, () => console.log(`SERVER LISTENING TO PORT : ${port}`))