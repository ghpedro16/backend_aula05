/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model para um CRUD de relacionamento de personagens e filmes
 * Data: 01/12/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da DAO
const personagemFilmeDAO = require('../../model/DAO/personagem_filme.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Lista todos os generos
const listarPersonagensFilmes = async function(){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        //Chama a função do DAO para retornar a lista de generos do BD
        let resultPersonagensFilmes = await personagemFilmeDAO.getSelectAllCharactersMovies()

        if(resultPersonagensFilmes){
            if(resultPersonagensFilmes.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.personagens_filme = resultPersonagensFilmes

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

//Lista genero pelo id
const buscarPersonagemFilmeId = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if(!isNaN(id) && id != '' && id != null && id > 0){
            //Chama a função do DAO
            let resultPersonagemFilme = await personagemFilmeDAO.getSelectCharacterMovieById(Number(id))

            if(resultPersonagemFilme){
                if(resultPersonagemFilme.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.personagem_filme = resultPersonagemFilme

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

//Lista genero pelo id
const listarPersonagensIdFilme = async function(id_filme){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if(!isNaN(id_filme) && id_filme != '' && id_filme != null && id_filme > 0){
            //Chama a função do DAO
            let resultPersonagemFilme = await personagemFilmeDAO.getSelectCharactersByIdMovies(Number(id_filme))

            if(resultPersonagemFilme){
                if(resultPersonagemFilme.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.personagem_filme = resultPersonagemFilme

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

//Lista filmes pelo id do personagem
const listarFilmesIdPersonagem = async function(id_personagem){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if(!isNaN(id_personagem) && id_personagem != '' && id_personagem != null && id_personagem > 0){
            //Chama a função do DAO
            let resultPersonagemFilme = await personagemFilmeDAO.getSelectMoviesByIdCharacters(Number(id_personagem))

            if(resultPersonagemFilme){
                if(resultPersonagemFilme.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.personagem_filme = resultPersonagemFilme

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

//Insere genero
const inserirPersonagemFilme = async function(personagemFilme, contentType){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDadosPersonagemFilme(personagemFilme)

            if(!validar){
                //Processamento
                //Chama a função para inserir um novo genero no banco de dados
                let resultPersonagemFilme = await personagemFilmeDAO.setInsertCharacterMovie(personagemFilme)
                
                if(resultPersonagemFilme){
                    //Chama a função para receber o ID gerado no BD
                    let lastId = await personagemFilmeDAO.getSelectLastId()

                    if(lastId){
                        //Adiciona o ID no JSON de dados do filme
                        personagemFilme.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.response = personagemFilme
                    
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

//Atualizar genero
const atualizarPersonagemFilme = async function(personagemFilme, id, contentType){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validar todos os dados
            let validar = await validarDadosPersonagemFilme(personagemFilme)

            if(!validar){

                //Validação do ID, chamando a Controller que verifica no BD se o ID existe e valida o ID
                let validarId = await buscarPersonagemFilmeId(id)

                if(validarId.status_code == 200){

                    //Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                    personagemFilme.id = Number(id)

                    //Processamento
                    //Chama a função para inserir um novo filme no banco de dados
                    let resultPersonagemFilme = await personagemFilmeDAO.setUpdateCharacterMovie(personagemFilme)
                
                    if(resultPersonagemFilme){
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.response.personagem_filme = personagemFilme
                    
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

//Excluir genero
const excluirPersonagemFilme = async function(id){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarId = await buscarPersonagemFilmeId(id)

            if(validarId.status_code == 200){

                //Chama a função do DAO
                let resultPersonagemFilme = await personagemFilmeDAO.setDeleteCharacterMovie(Number(id))

                if(resultPersonagemFilme){

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.response.personagem_filme = resultPersonagemFilme

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

const validarDadosPersonagemFilme = async function(personagemFilme){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (personagemFilme.id_filme == '' || personagemFilme.id_filme == undefined || personagemFilme.id_filme == null || isNaN(personagemFilme.id_filme || personagemFilme.id_filme <= 0)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_filme incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(personagemFilme.id_personagem == '' || personagemFilme.id_personagem == undefined || personagemFilme.id_personagem == null || isNaN(personagemFilme.id_personagem || personagemFilme.id_personagem <= 0)){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_genero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarPersonagensFilmes,
    buscarPersonagemFilmeId,
    listarPersonagensIdFilme,
    listarFilmesIdPersonagem,
    inserirPersonagemFilme,
    atualizarPersonagemFilme,
    excluirPersonagemFilme
}