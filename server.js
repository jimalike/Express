require('dotenv').config()
const express = require('express')
const app = express()

const todos = [
    {id: 11, title : 'Learn HTML'},
    {id: 22, title : 'Learn CSS'},
    {id: 33, title : 'Learn Javascript'},
]

app.get('/', (req,res) => {
    res.json({msg : 'Welcome to Express Server'})
})
app.get('/todos',(req,res) => {
    res.json(todos)
})

// แปลง code ให้หาจาก id ถ้าไม่มี msg : "have no data" , status เป็น 404
app.get('/todos/:id', (req,res) => {
    const {id} = req.params
    console.log(id)
    let output = todos.filter(el=>el.id === +id)
    if(output.length <= 0) 
        return res.status(404).json({msg : `have no data with id=${id}`})
    // res.send(todos[+req.params.index])
    res.json(output)
})

app.use((req,res)=> {
    res.status(404).send({msg: 'resource not found'})
})
let port = process.env.PORT || 8000
app.listen(port, ()=> {
    console.log("Server on port :", port)
})