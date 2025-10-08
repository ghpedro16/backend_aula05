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
app.get('/v1/locadora/filmes', cors(), async function(request, response){
    //Chama a função para listar os filmes existentes no BD
    let filmes = await controllerFilme.listarFilmes()

    response.status(filmes.status_code).json(filmes)
})

app.get('/v1/locadora/filme/:id', cors(), async function(request, response){
    //Recebe o ID via parametro
    let idFilme = request.params.id

    //Chama a função para listar os filmes existentes no BD
    let filme = await controllerFilme.buscarFilmeId(idFilme)

    response.status(filme.status_code).json(filme)
})


app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})