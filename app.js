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
const controllerClassificacao = require('./controller/classificacao/controller_classificacao.js')
const controllerPersonagem = require('./controller/personagem/controller_personagem.js')
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerPais = require('./controller/pais_origem/controller_pais_origem.js')

//EndPoint para as rotas de filmes

//Importa todos os filmes
app.get('/v1/locadora/filmes', cors(), async function (request, response) {
    //Chama a função para listar os filmes existentes no BD
    let filmes = await controllerFilme.listarFilmes()

    response.status(filmes.status_code).json(filmes)
})

//Importa o filme filtrando pelo ID
app.get('/v1/locadora/filme/:id', cors(), async function (request, response) {
    //Recebe o ID via parametro
    let idFilme = request.params.id

    //Chama a função para listar os filmes existentes no BD
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code).json(filme)
})

//
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async function (request, response) {
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code).json(filme)
})

app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async function (request, response) {
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

app.delete('/v1/locadora/filme/:id', cors(), async function (request, response) {
    //Recebe o id do filme
    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code).json(filme)

})

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
app.post('/v1/locadora/classificacao'.cors(), bodyParserJSON, async function (request, response) {
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
app.delete('/v1/locadora/genero/:id', cors(), async function(response, request){
    //Recebe o id do personagem
    let idGenero = request.params.id

    let genero = await controllerGenero.excluirGenero(idGenero)

    response.status(genero.status_code).json(genero)
})

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
app.post('/v1/locadora/pais_origem', cors(), bodyParserJSON, async function(request, response){
    //Recebe os dados do body da requisição (se utilizar o bodyParser, é obrigatório ter no EndPoint)
    let dadosBody = request.body

    //Recebe o tipo de dado da requisição (JSON ou XML)
    let contentType = request.headers['content-type']

    let pais_origem = await controllerPais(dadosBody, contentType)

    response.status(pais_origem.status_code).json(pais_origem)
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
app.delete('/v1/locadora/pais_origem/:id', cors(), async function(response, request){
    //Recebe o id do personagem
    let idPais = request.params.id

    let pais_origem = await controllerPais.excluirPais(idPais)

    response.status(pais_origem.status_code).json(pais_origem)
})


app.listen(PORT, function () {
    console.log('API aguardando requisições...')
})