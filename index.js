const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

//Desafio: criar um endpoint /oi que exibe "Olá, Mundo"
app.get('/oi', function (req, res) {
    res.send('Olá Mundo')
})


app.listen(3000)