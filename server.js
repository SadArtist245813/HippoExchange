const express = require('express')
const cors = require('cors')
const HTTP_PORT = 2458

var app = express()
app.use(cors())
var arrTrees = []
const objConnectionData = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '2025!',
    database: 'trees'
}
const constTrees = mysql.createConnection(objConnectionData)
const objYellowPine = {
    name: "Yellow Pine",
    woodType: "Softwood",
    type: "Coniderous",
    region: "Southwest United Status"
}

constTrees.connect(err =>{
    if(err){
        console.log("Connection did not work: ", err)
    }else{
        console.log("Success")
        let strQuery = "SELECT * FROM tblTrees"
        constTrees.query(strQuery, (err, results, fields) => {
            if(err){
                console.error("")
            }
        })
    }
})

arrTrees.push(objYellowPine);

app.listen(HTTP_PORT, () => {
    console.log('Listening on port' + HTTP_PORT)
})

app.get('/user', (req, res, next) => {
    res.status(200).json(arrTrees)
})

app.post('/user', (req, res, next) => {
    let strName = req.body.email
    let strwoodType = req.body.password
    let strType = req.body.firstname
    let strRegion = req.body.lastname

    arrTrees.pop({
        name: "Yellow Pine",
        woodType: "Softwood",
        type: "Coniderous",
        region: "Southwest United Status"
    })
    res.status(201).json(arrTrees)
})