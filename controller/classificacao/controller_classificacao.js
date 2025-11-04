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
const listarClassificacoes = async function () {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Chama a funcao do DAO para retornar os dados
        let resultClassificacoes = await classificacaoDAO.getSelectAllClassification()

        if (resultClassificacoes) {
            if (resultClassificacoes.length > 0) {
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.classificacao = resultClassificacoes

                return MESSAGES.DEFAULT_HEADER //200
            }
        } else {
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Retorna uma classificacao filtrando pelo ID
const buscarClassificacaoId = async function (id) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if (!isNaN(id) && id != '' && id != null && id > 0) {
            //Chama a função do DAO
            let resultClassificacao = await classificacaoDAO.getSelectClassificationById(id)

            if (resultClassificacao) {
                if (resultClassificacao.length > 0) {
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.classificacao = resultClassificacao

                    return MESSAGES.DEFAULT_HEADER
                } else {
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Insere uma classificacao
const inserirClassificacao = async function (classificacao, contentType) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDadosClassificacao(classificacao)

            if (!validar) {
                //Processamento
                //Chama a função para inserir uma nova classificacao no banco de dados
                let resultClassificacao = await classificacaoDAO.setInsertClassification(classificacao)
                
                if (resultClassificacao) {
                    //Chama a função para receber o ID gerado no BD
                    let lastId = await classificacaoDAO.getSelectLastId()
        
                    console.log(lastId)
                    if (lastId) {
                        //Adiciona o ID no JSON de dados da classificacao
                        classificacao.id_classificacao = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.response = classificacao

                        return MESSAGES.DEFAULT_HEADER //201
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return validar // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }

}

//Atualiza uma classificacao
const atualizarClassificacao = async function (classificacao, id, contentType) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //Chama a função de validar todos os dados
            let validar = await validarDadosClassificacao(classificacao)

            if (!validar) {

                //Validação do ID, chamando a Controller que verifica no BD se o ID existe e valida o ID
                let validarId = await buscarClassificacaoId(id)

                if (validarId.status_code == 200) {

                    //Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                    classificacao.id_classificacao = Number(id)
                
                    //Processamento
                    //Chama a função para inserir um novo filme no banco de dados
                    let resultClassificacao = await classificacaoDAO.setUpdateClassification(classificacao)
                    
                    if (resultClassificacao) {
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.response.classificacao = classificacao

                        return MESSAGES.DEFAULT_HEADER //200
                    } else {
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                } else {
                    return validarId // A função buscarClassificacaoId poderá retornar um erro 400, 404 ou 500
                }
            } else {
                return validar // 400
            }
        } else {
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Exclui uma classificacao
const excluirClassificacao = async function (id) {
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if (!isNaN(id) && id != '' && id != null && id > 0) {

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarId = await buscarClassificacaoId(id)

            if (validarId.status_code == 200) {

                //Chama a função do DAO
                let resultClassificacao = await classificacaoDAO.setDeleteClassification(Number(id))

                if (resultClassificacao) {

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.response.classificacao = resultClassificacao

                    delete MESSAGES.DEFAULT_HEADER.response

                    return MESSAGES.DEFAULT_HEADER //200
                } else {
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            } else {
                return MESSAGES.ERROR_NOT_FOUND // 404
            }

        } else {
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

const validarDadosClassificacao = async function (classificacao) {

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (classificacao.simbolo == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Simbolo incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (classificacao.classificacao_indicativa == '' || classificacao.classificacao_indicativa == null || classificacao.classificacao_indicativa == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Classificação indicativa incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (classificacao.descricao == '' || classificacao.descricao == null || classificacao.descricao == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descrição incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarClassificacoes,
    buscarClassificacaoId,
    inserirClassificacao,
    atualizarClassificacao,
    excluirClassificacao
}
