/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de personagens do filme
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
const controllerPersonagem = require('../controller/personagem/controller_personagem.js')

//Import da controller de ator personagem
const controllerAtorPersonagem = require('../controller/ator/controller_ator_personagem.js')

//Lista todos os personagens
app.get('/v1/locadora/personagens', cors(), async function(request, response){
    //Chama a função para listar os personagens existentes no BD
    let personagem = await controllerPersonagem.listarPersonagens()

    response.status(personagem.status_code).json(personagem)
})

//Filtra um personagem pelo ID
app.get('/v1/locadora/personagem/:id', cors(), async function (request, response) {
    //Recebe o id via parametro
    let idPersonagem = request.params.id

    let personagem = await controllerPersonagem.buscarPersonagemId(idPersonagem)

    response.status(personagem.status_code).json(personagem)
})

//Lista os intérpretes do personagem pelo id
app.get('/v1/locadora/personagem/interpretes/:id', cors(), async function (request, response) {
    //Recebe o id via parametro
    let idPersonagem = request.params.id

    let personagem = await controllerAtorPersonagem.listarAtoresFilmesIdPersonagem(idPersonagem)

    response.status(personagem.status_code).json(personagem)
})

//Insere um personagem
app.post('/v1/locadora/personagem', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let personagem = await controllerPersonagem.inserirPersonagem(dadosBody, contentType)

    response.status(personagem.status_code).json(personagem)
})

//Atualiza um personagem
app.put('/v1/locadora/personagem/:id', cors(), bodyParserJSON, async function (request, response) {
    //Recebe o id do personagem
    let idPersonagem = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let personagem = await controllerPersonagem.atualizarPersonagem(dadosBody, idPersonagem, contentType)

    response.status(personagem.status_code).json(personagem)
})

//Deleta um personagem
app.delete('/v1/locadora/personagem/:id', cors(), async function (request, response) {
    //Recebe o id do personagem
    let idPersonagem = request.params.id

    let personagem = await controllerPersonagem.excluirPersonagem(idPersonagem)

    response.status(personagem.status_code).json(personagem)
})

module.exports = app;