const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const HTTP_PORT = 8000


var app = express()
app.use(cors())
app.use(express.json())

const objConnectionData = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '2025!',
    database: 'hippoexchange'
}

const hippoExchange = mysql.createConnection(objConnectionData)

hippoExchange.connect(err => {
    if(err){
        console.log("Connection did not work: ", err);
    }else{
        console.log("Success");
        let strQuery = "SELECT * FROM tblTrees";
        hippoExchange.query(strQuery, (err, results, fields) => {
            if(err){
                console.error("Query error: ", err);
            }else{
                console.log("Query results: ", results); // Log results for debugging
            }
        })
    }
})

app.listen(HTTP_PORT, () => {
    console.log('Listening on port' + HTTP_PORT)
})

app.post('/user', (req, res, next) => {
    let {Email, Password, FirstName, LastName} = req.body;

    if (!Email || !Password || !FirstName || !LastName) {
        return res.status(400).json({error: 'Email, Password, FirstName, and LastName are required.'});
    }

    let sql = 'INSERT INTO tblusers (Email, Password, FirstName, LastName, CurrentDateTime) VALUES (?, ?, ?, ?, NOW())';
    let values = [Email, Password, FirstName, LastName];

    hippoExchange.query(sql, values, (err, result) => {
        if(err){
            console.error('Error inserting data:', err);
            return res.status(500).json('status:Success');
        }
        console.log('Data inserted successfully:', result);
        res.status(201).json('status:Failed');
    });
})

/*app.post('/session', (req, res, next) => {
    let { SessionID, UserID, CreatedDateTime } = req.body;

    if (!SessionID || !UserID || !CreatedDateTime) {
        return res.status(400).send('... are required.');
    }

    let sql = 'INSERT INTO tblsessions (name, email) VALUES (?, ?)';
    let values = [email, password, firstName, lastName];

    pool.query(sql, values, (err, result) => {
        if (err) {
            return console.error('Error inserting data:', err);
        }
        console.log('Data inserted successfully:', result);
    });
})*/


/*
const express = require('express');
const mysql = require('mysql'); // Or const mysql = require('mysql2');

const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// MySQL Connection Pool (recommended for production)
const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_mysql_user',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

// POST route to insert data
app.post('/api/data', (req, res) => {
    const { name, email } = req.body; // Extract data from request body

    if (!name || !email) {
        return res.status(400).send('Name and email are required.');
    }

    const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
    const values = [name, email];

    pool.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send('Error inserting data into database.');
        }
        console.log('Data inserted successfully:', result);
        res.status(201).send('Data inserted successfully.');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
*/