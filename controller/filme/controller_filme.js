/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model para um CRUD de filmes
 * Data: 07/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import do model DAO do filme
const filmeDAO = require('../../model/DAO/filme.js')

//Import do arquivo de mensagens
const MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os filmes
const listarFilmes = async function(){
    //Chama a função do DAO para retornar a lista de filmes do BD
    let resultFilmes = await filmeDAO.getSelectAllMovies()

    if(resultFilmes){
        if(resultFilmes.length > 0){
            MESSAGES.MESSAGE_HEADER.status = MESSAGES.MESSAGE_REQUEST_SUCCESS.status
            MESSAGES.MESSAGE_HEADER.status_code = MESSAGES.MESSAGE_REQUEST_SUCCESS.status_code
            MESSAGES.MESSAGE_HEADER.response.filmes = resultFilmes

            return MESSAGES.MESSAGE_HEADER
        }
    }
}

//Retorna um filme filtrando pelo ID 
const buscarFilmeId = async function(id){
    
}

//Insere um filme
const inserirFilme = async function(filme){

}

//Atualiza um filme buscando pelo ID
const atualizarFilme = async function(filme, id){
    
}

//Exclui um filme buscando pelo ID
const excluirFilme = async function(id){
    
}

module.exports = {
    listarFilmes
}