const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

//Desafio: criar um endpoint /oi que exibe "Olá, Mundo"
app.get('/oi', function (req, res) {
    res.send('Olá Mundo')
})

// lista de personagens

const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

// Read All - [GET] /item
app.get('/item', function (req, res) {
  //Pegamos a lista e enviamos como resposta ao HTTP
  res.send(lista)
})

//Sinalizamos para o Express que vamos usar o JSON no Body

app.use(express.json())

//Creat - [POST] /item
app.post('/item', function (req, res) {
  //Obtemos o nome enviado no Request Body
  const item = req.body.nome
  
  // Inserimos o item no final da lista
  lista.push(item)

  //Enviamos uma mensagem de Sucesso
  res.send('Item Criado com Sucesso!')



})

app.listen(3000)