/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de generos de filmes
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
const controllerGenero = require('../controller/genero/controller_genero.js')

//Retorna todos generos
app.get('/v1/locadora/generos', cors(), async function(request, response){
    //Chama a função para listar os generos existentes no BD
    let genero = await controllerGenero.listarGeneros()

    response.status(genero.status_code).json(genero)
})

//Retorna genero pelo id
app.get('/v1/locadora/genero/:id', cors(), async function(request, response){
    //Recebe o id via parametro
    let idGenero = request.params.id

    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code).json(genero)
})

//Insere um genero
app.post('/v1/locadora/genero', cors(), bodyParserJSON, async function(request, response){
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code).json(genero)
})

//Atualizar genero
app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async function(request, response){
    //Recebe o id do personagem
    let idGenero = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code).json(genero)
})

//Deleta um genero
app.delete('/v1/locadora/genero/:id', cors(), async function (request, response) {
    //Recebe o id do genero
    let idGenero = request.params.id

    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code).json(genero)
})

module.exports = app;