/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de filmes
 * Data: 04/11/2025
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

//Import da controller
const controllerFilme = require('../controller/filme/controller_filme.js')

//Retorna todos os filmes
app.get('/v1/locadora/filmes', cors(), async function (request, response) {
    //Chama a função para listar os filmes existentes no BD
    let filmes = await controllerFilme.listarFilmes()

    response.status(filmes.status_code).json(filmes)
})

//Retorna o filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {
    //Recebe o ID via parametro
    let idFilme = request.params.id

    //Chama a função para listar os filmes existentes no BD
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code).json(filme)
})

//Insere um filme
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code).json(filme)
})

//Atualiza um filme
app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o id do filme
    let idFilme = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let filme = await controllerFilme.atualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code).json(filme)
})

//Deleta um filme
app.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {
    //Recebe o id do filme
    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code).json(filme)
})

module.exports = app;