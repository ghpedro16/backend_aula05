/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelas requisições da API da locadora de filmes
 * Data: 07/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import das dependencias da API
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

//Cria um objeto especialista no formato JSON para receber dados via POST e PUT
const bodyParserJSON = bodyParser.json()

//Criando uma instancia de uma classe do express 
const app = express()

//Retorna a porta do servidor atual ou colocamos uma porta local 
const PORT = process.PORT || 8080

//Configuração de permissoes
app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*') //Servidor de origem da API
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') //Verbos permitidos
    //Carrega as configurações do CORS da API
    app.use(cors())
    next() //Proximo, carregar os proximos endpoints
})

//Import das controllers
const controllerFilme = require('./controller/filme/controller_filme.js')

//EndPoint para as rotas de filmes

//Importa todos os filmes
app.get('/v1/locadora/filmes', cors(), async function(request, response){
    //Chama a função para listar os filmes existentes no BD
    let filmes = await controllerFilme.listarFilmes()

    response.status(filmes.status_code).json(filmes)
})

//Importa o filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function(request, response){
    //Recebe o ID via parametro
    let idFilme = request.params.id

    //Chama a função para listar os filmes existentes no BD
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code).json(filme)
})

//
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function(request, response){
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code).json(filme)
})

app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function(request, response){
    //Recebe o id do filme
    let idFilme = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    //
    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code).json(filme)
})

app.delete('/v1/locadora/filme/:id', cors(), async function(request, response){
    //Recebe o id do filme
    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code).json(filme)

})

app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})