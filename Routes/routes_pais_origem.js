/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela criação dos endpoints do CRUD de paises de origem relacionados ao filme
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
const controllerPais = require('../controller/pais_origem/controller_pais_origem.js')

//Retorna todos paises
app.get('/v1/locadora/paises', cors(), async function(request, response){
    //Chama a função para listar os paises de origem existentes no BD
    let paises = await controllerPais.listarPaises()

    response.status(paises.status_code).json(paises)
})

//Retorna pais origem pelo id
app.get('/v1/locadora/pais_origem/:id', cors(), async function(request, response){
    //Recebe o id via parametro
    let idPais = request.params.id

    let pais_origem = await controllerPais.buscarPaisesId(idPais)

    response.status(pais_origem.status_code).json(pais_origem)
})

//Insere um pais
app.post('/v1/locadora/pais_origem', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let pais = await controllerPais.inserirPais(dadosBody, contentType)

    response.status(pais.status_code).json(pais)
})

//Atualizar pais
app.put('/v1/locadora/pais_origem/:id', cors(), bodyParserJSON, async function(request, response){
    //Recebe o id do personagem
    let idPais = request.params.id

    //Recebe os dados a serem atualizados
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let pais_origem = await controllerPais.atualizarPais(dadosBody, idPais, contentType)

    response.status(pais_origem.status_code).json(pais_origem)
})

//Deleta um pais
app.delete('/v1/locadora/pais_origem/:id', cors(), async function (request, response) {
    //Recebe o id do pais
    let idPais = request.params.id

    let pais = await controllerPais.excluirPais(idPais)

    response.status(pais.status_code).json(pais)
})

module.exports = app;