const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

const dbUrl = 'mongodb+srv://admin:YsxMZNa5uv7Lmo6o@cluster0.ifcbcgk.mongodb.net/'
const dbName = 'ocean-jornada-backend'

const client = new MongoClient(dbUrl)

async function main() {
  console.log('Conectando ao Banco de Dados...')
  await client.connect()
  console.log('Banco de Dados conectado com sucesso!')


  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  //Desafio: criar um endpoint /oi que exibe "Olá, Mundo"
  app.get('/oi', function (req, res) {
    res.send('Olá Mundo')
  })

  // lista de personagens
  const lista = ['Rick Sanchez', 'Morty Smith', 'Summer Smith']

  const db = client.db(dbName)
  const collection = db.collection('item')

  // Read All - [GET] /item
  app.get('/item', async function (req, res) {
    // Obter todos os documentos da collection
    const documentos = await collection.find().toArray()

    //Pegamos a lista e enviamos como resposta ao HTTP
    res.send(documentos)
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
  app.get('/item/:id', function (req, res) {
    //Acessamos o parâmetro de rota ID
    const id = req.params.id

    //Acessamos o item na lista pelo índice corrigido (id-1)
    const item = lista[id - 1]

    //Enviamos o item obtido como resposta
    res.send(item)

  })

  //Update PUT - atualização completa - /item/:id
  app.put('/item/:id', function (req, res) {
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

}

main()

