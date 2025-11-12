/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de atores do filme
 * Data: 12/11/2025
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
const controllerAtor = require('../controller/ator/controller_ator.js')

//Lista todos os atores
app.get('/v1/locadora/atores', cors(), async function(request, response){
    //Chama a função para listar os personagens existentes no BD
    let ator = await controllerAtor.listarAtores()

    response.status(ator.status_code).json(ator)
})

//Filtra um ator pelo ID
app.get('/v1/locadora/ator/:id', cors(), async function (request, response) {
    //Recebe o id via parametro
    let idAtor = request.params.id

    let ator = await controllerAtor.buscarAtorId(idAtor)

    response.status(ator.status_code).json(ator)
})

//Insere um ator
app.post('/v1/locadora/ator', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let ator = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(ator.status_code).json(ator)
})

//Atualiza um ator
app.put('/v1/locadora/ator/:id', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o id do ator
    let idAtor = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let ator = await controllerAtor.atualizarAtor(dadosBody, idAtor, contentType)

    response.status(ator.status_code).json(ator)
})

//Deleta um ator
app.delete('/v1/locadora/ator/:id', cors(), async function (request, response) {
    //Recebe o id do ator
    let idAtor = request.params.id

    let ator = await controllerAtor.excluirAtor(idAtor)

    response.status(ator.status_code).json(ator)
})

module.exports = app;