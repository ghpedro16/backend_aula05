/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de classificacao indicativa de filmes
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
const controllerClassificacao = require('../controller/classificacao/controller_classificacao.js')

//Lista todas as classificacoes
app.get('/v1/locadora/classificacoes', cors(), async function (request, response) {
    //Chama a função para listar as classificacoes existentes no BD
    let classificacao = await controllerClassificacao.listarClassificacoes()

    response.status(classificacao.status_code).json(classificacao)
})

//Filtra uma classificacao pelo ID
app.get('/v1/locadora/classificacao/:id', cors(), async function (request, response) {
    //Recebe o id via parametro
    let idClassificacao = request.params.id

    let classificacao = await controllerClassificacao.buscarClassificacaoId(idClassificacao)

    response.status(classificacao.status_code).json(classificacao)
})

//Insere uma classificacao
app.post('/v1/locadora/classificacao', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let classificacao = await controllerClassificacao.inserirClassificacao(dadosBody, contentType)

    response.status(classificacao.status_code).json(classificacao)
})

//Atualiza uma classificacao
app.put('/v1/locadora/classificacao/:id', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o id da classificacao
    let idClassificacao = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let classificacao = await controllerClassificacao.atualizarClassificacao(dadosBody, idClassificacao, contentType)

    response.status(classificacao.status_code).json(classificacao)
})

//Deleta uma classificacao
app.delete('/v1/locadora/classificacao/:id', cors(), async function (request, response) {
    //Recebe o id da classificacao
    let idClassificacao = request.params.id

    let classificacao = await controllerClassificacao.excluirClassificacao(idClassificacao)

    response.status(classificacao.status_code).json(classificacao)
})

module.exports = app;