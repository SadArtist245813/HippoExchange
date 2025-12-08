const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const HTTP_PORT = 8000

var app = express()
app.use(cors())
app.use(express.json())

const objConnectionData = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '2025!',
    database: 'hippo_exchange'
}

/*const objConnectionData = {
    host: '45.84.196.164',
    user: 'skydyn_test1',
    port: 3306,
    password: 'test@12311',
    database: 'test1'
}*/

const hippoExchange = mysql.createConnection(objConnectionData)
hippoExchange.connect(err => {
    if(err){
        console.log("Connection did not work: ", err)
    }else{
        console.log("Success")
        let strQuery = "SELECT * FROM tblTrees"
        hippoExchange.query(strQuery, (err, results, fields) => {
            if(err){
                console.error("")
            }
        })
    }
})

app.listen(HTTP_PORT, () => {
    console.log('Listening on port: ' + HTTP_PORT)
})

app.post('/user', (req, res, next) => {
    let{Email, Password, FirstName, LastName} = req.body

    if(!Email || !Password || !FirstName || !LastName){
        return res.status(400).send('... are required.')
    }

    try{
        let sql = 'INSERT INTO tblusers (Email, Password, FirstName, LastName, CreatedDateTime) VALUES (?, ?, ?, ?, NOW())'
        let values = [Email, Password, FirstName, LastName]

        hippoExchange.query(sql, values, (err, result) => {
            if(err){
                console.error('Error inserting data:', err)
                return res.status(500).json('status:Success')
            }
            console.log('Data inserted successfully:', result)
            res.status(201).json('status:Failed')
        })
    }catch(error){
        console.error('Unexpected error:', error)
        res.status(500).json({ status: 'Failed', error: 'Unexpected error occurred' })
    }
})

app.post('/session', (req, res, next) => {
    let { SessionID, UserID, CreatedDateTime } = req.body;

    if (!SessionID || !UserID || !CreatedDateTime) {
        return res.status(400).send('... are required.');
    }
    try{
        let sql = 'INSERT INTO tblsessions (name, email) VALUES (?, ?)';
        let values = [email, password, firstName, lastName];
    
        hippoExchange.query(sql, values, (err, result) => {
            if(err){
                console.error('Error inserting data:', err)
                return res.status(500).json('status:Success')
            }
            console.log('Data inserted successfully:', result)
            res.status(201).json('status:Failed')
        })
    }catch(error){
        console.error('Unexpected error:', error)
        res.status(500).json({ status: 'Failed', error: 'Unexpected error occurred' })
    }
})