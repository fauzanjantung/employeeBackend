const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('./Employee')

app.use(bodyParser.json())

const Employee = mongoose.model("employee")

const mongoUri = "mongodb+srv://cnq:53u2wBMu9iKBxDu4@cluster0-7b4g1.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(mongoUri, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on("connected", ()=>{
    console.log("Connected to Mongo")
})

mongoose.connection.on("error", ()=>{
    console.log("Not Connected, Err")
})

app.get('/',(req,res)=>{
    res.send("Welcome to node js")
})

app.post('/send-data', (req,res)=>{
    const employee = new Employee({
        name: req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    })
    employee.save()
    .then(data=>{
        console.log(data)
        res.send("Success")
    }).catch(err=>{
        console.log(err)
    })
    
})

app.listen(3000, ()=>{
    console.log("Server running")
})