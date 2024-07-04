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

//Read By Id - [GET] /item/:id
app.get('/item/:id', function (req, res){
  //Acessamos o parâmetro de rota ID
  const id = req.params.id 
  
//Acessamos o item na lista pelo índice corrigido (id-1)
  const item = lista [id - 1]

//Enviamos o item obtido como resposta
  res.send(item)

})

//Update PUT - atualização completa - /item/:id
app.put('/item/:id', function (req, res){
  //Acessamos o ID do parâmetro de rota
  const id = req.params.id
  // Acessamos o Body da requisição, com os dados a serem atualizados
  const novoItem = req.body.nome

  // Atualizamos esse novoItem na lsita, usando o índice
  lista[id - 1] = novoItem

  //Enviamos a mensagem de sucesso
  res.send('Item Atualizado com Sucesso: ' + id)
})

app.listen(3000)