/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelos padrões de mensagens que o projeto irá realizar, sempre no formato JSON (Sucessos, Erros, etc)
 * Data: 07/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Cria um objeto da classe Date para pegar a data atual
const dataAtual = new Date()

/********************************************************************   MENSAGENS PADRONIZADAS  ********************************************************************/

const DEFAULT_HEADER = {

    development: 'Pedro Silva',
    api_description: 'API para manipular dados de filmes',
    status: Boolean,
    status_code: Number,
    request_date: dataAtual.toLocaleString(),
    response: {}

}


/********************************************************************   MENSAGENS DE SUCESSO    ********************************************************************/

const SUCCESS_REQUEST = {status: true, status_code: 200, message: 'Requisição bem sucedida...'}

/********************************************************************    MENSAGENS DE ERRO      ********************************************************************/

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foram encontrados dados de retorno!'}

const ERROR_INTERNAL_SERVER_CONTROLLER = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição devido a erros internos no servidor. (CONTROLLER)'}

const ERROR_INTERNAL_SERVER_MODEL = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição devido a erros internos no servidor. (MODEL) '}

const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message: 'Existem campos obrigatórios que não foram preenchidos ou estão inválidos!'}

module.exports = {
    DEFAULT_HEADER,
    SUCCESS_REQUEST,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_REQUIRED_FIELDS
}