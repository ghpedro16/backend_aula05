/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model para um CRUD de classificacao indicativa
 * Data: 22/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import do arquivo DAO de classificacoes
const classificacaoDAO = require('../../model/DAO/classificacao.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todas as classificacoes
const listarClassificacoes = async function(){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Chama a funcao do DAO para retornar os dados
        let resultClassificacoes = await classificacaoDAO.getSelectAllClassification()

        if(resultClassificacoes){
            if(resultClassificacoes.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.classificacao = resultClassificacoes

                return MESSAGES.DEFAULT_HEADER //200
            }
        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Retorna uma classificacao filtrando pelo ID
const buscarClassificacaoId = async function(id){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        
        if(!isNaN(id) && id != '' && id != null && id > 0){
            //Chama a função do DAO
            let resultClassificacao = await classificacaoDAO.getSelectClassificationById(id)

            if(resultClassificacao){
                if(resultClassificacao.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.classificacao = resultClassificacao

                    return MESSAGES.DEFAULT_HEADER
                }else{
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere uma classificacao 
const inserirClassificacao = async function(classificacao, contentType){

}

//Atualiza uma classificacao
const atualizarClassificacao = async function(classificacao, id, contentType){

}

//Exclui uma classificacao
const excluirClassificacao = async function(id){

}


module.exports = {
    listarClassificacoes,
    buscarClassificacaoId
}
