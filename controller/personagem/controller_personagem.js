/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model para um CRUD de personagens
 * Data: 07/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import do model DAO do personagem
const personagemDAO = require('../../model/DAO/personagem.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Lista todos os personagens existentes
const listarPersonagens = async function(){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        //Chama a função do DAO para retornar a lista de personagens do BD
        let resultPersonagens = await personagemDAO.getAllSelectCharacters()

        if(resultPersonagens){
            if(resultPersonagens.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.personagens = resultPersonagens

                return MESSAGES.DEFAULT_HEADER // 200
            }else{
                return MESSAGES.ERROR_NOT_FOUND // 404
            }
        }else{
            return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Retorna um personagem pelo ID
const buscarPersonagemId = async function(id){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if(!isNaN(id) && id != '' && id != null && id > 0){
            //Chama a função do DAO
            let resultPersonagem = await personagemDAO.getSelectCharacterById(Number(id))

            if(resultPersonagem){
                if(resultPersonagem.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.personagem = resultPersonagem

                    return MESSAGES.DEFAULT_HEADER // 200
                }else{
                    return MESSAGES.ERROR_NOT_FOUND // 404
                }
            }else{
                return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
            }
        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Insere um personagem
const inserirPersonagem = async function(personagem, contentType){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDadosPersonagem(personagem)

            if(!validar){
                //Processamento
                //Chama a função para inserir um novo filme no banco de dados
                let resultPersonagem = await personagemDAO.setInsertCharacter(personagem)
                
                if(resultPersonagem){
                    //Chama a função para receber o ID gerado no BD
                    let lastId = await personagemDAO.getSelectLastId

                    if(lastId){
                        //Adiciona o ID no JSON de dados do filme
                        personagem.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.response = personagem
                    
                        return MESSAGES.DEFAULT_HEADER //201
                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }else{
                return validar // 400
            }
        }else{
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }

    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Atualiza um personagem
const atualizarPersonagem = async function(personagem, id, contentType){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validar todos os dados
            let validar = await validarDadosPersonagem(personagem)

            if(!validar){

                //Validação do ID, chamando a Controller que verifica no BD se o ID existe e valida o ID
                let validarId = await buscarPersonagemId(id)

                if(validarId.status_code == 200){

                    //Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                    personagem.id = Number(id)
                    //Processamento
                    //Chama a função para inserir um novo filme no banco de dados
                    let resultPersonagem = await personagemDAO.setUpdateCharacter(personagem)
                    
                    if(resultPersonagem){
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.response.personagem = personagem
                    
                        return MESSAGES.DEFAULT_HEADER //200
                    }else{
                        return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                    }
                }else{
                    return validarId // A função buscarFilmeId poderá retornar um erro 400, 404 ou 500
                }
            }else{
                return validar // 400
            }
        }else{
            return MESSAGES.ERROR_CONTENT_TYPE // 415
        }
    } catch (error){
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Exclui um personagem
const excluirPersonagem = async function(id){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarId = await buscarPersonagemId(id)

            if(validarId.status_code == 200){

                //Chama a função do DAO
                let resultPersonagem = await personagemDAO.setDeleteCharacter(Number(id))

                if(resultPersonagem){

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.response.personagem = resultPersonagem

                    delete MESSAGES.DEFAULT_HEADER.response

                    return MESSAGES.DEFAULT_HEADER //200
                }else{
                    return MESSAGES.ERROR_INTERNAL_SERVER_MODEL // 500
                }
            }else{
                return MESSAGES.ERROR_NOT_FOUND // 404
            }

        }else{
            MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [ID Incorreto!]'
            return MESSAGES.ERROR_REQUIRED_FIELDS // 400
        }
    } catch (error) {
        return MESSAGES.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

//Validar dados do personagem
const validarDadosPersonagem = async function(personagem){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (personagem.nome == '' || personagem.nome == undefined || personagem.nome == null || personagem.nome.length > 150) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (personagem.descricao == '' || personagem.descricao == undefined || personagem.descricao == null || personagem.descricao.length > 1500) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Descrição incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if (personagem.ficticio == undefined) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Ficticio incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(personagem.foto == undefined || personagem.foto.length > 200) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foto incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarPersonagens,
    buscarPersonagemId,
    inserirPersonagem,
    atualizarPersonagem,
    excluirPersonagem
}