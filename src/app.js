const express = require('express')
const {v4} = require('uuid')
const app = express()
app.use(express.json())

app.get('/tasks', (req,res)=>{
    res.send([])
})

app.post('/tasks', (req,res)=>{
    const {title, description} = req.body

    if(!title || !description) return res.sendStatus(400)

    res.json({
        title,
        description,
        id : v4()
    })
})

module.exports = app