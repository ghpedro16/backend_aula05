/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens que o projeto irá realizar, sempre no formato JSON (Sucessos, Erros, etc)
 * Data: 07/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Cria um objeto da classe Date para pegar a data atual
const dataAtual = new Date()

/********************************************************************   MENSAGENS PADRONIZADAS  ********************************************************************/

const MESSAGE_HEADER = {

    development: 'Pedro Silva',
    api_description: 'API para manipular dados de filmes',
    status: Boolean,
    status_code: Number,
    request_date: dataAtual.getTimezoneOffset(),
    response: {}

}


/********************************************************************   MENSAGENS DE SUCESSO    ********************************************************************/

const MESSAGE_REQUEST_SUCCESS = {status: true, status_code: 200, message: 'Requisição bem sucedida...'}

/********************************************************************    MENSAGENS DE ERRO      ********************************************************************/



module.exports = {
    MESSAGE_HEADER,
    MESSAGE_REQUEST_SUCCESS
}