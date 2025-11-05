/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model para um CRUD de relacionamento de filmes e generos
 * Data: 07/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da DAO
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Lista todos os generos
const listarFilmesGeneros = async function(){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        //Chama a função do DAO para retornar a lista de generos do BD
        let resultFilmesGeneros = await filmeGeneroDAO.getSelectAllMoviesGenres()

        if(resultFilmesGeneros){
            if(resultFilmesGeneros.length > 0){
                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.filmes_generos = resultFilmesGeneros

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
const buscarFilmeGeneroId = async function(id){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if(!isNaN(id) && id != '' && id != null && id > 0){
            //Chama a função do DAO
            let resultFilmeGenero = await filmeGeneroDAO.getSelectMovieGenreById(Number(id))

            if(resultFilmeGenero){
                if(resultFilmeGenero.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.filme_genero = resultFilmeGenero

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
const listarGenerosIdFilme = async function(id_filme){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if(!isNaN(id_filme) && id_filme != '' && id_filme != null && id_filme > 0){
            //Chama a função do DAO
            let resultFilmeGenero = await filmeGeneroDAO.getSelectGenresByIdMovies(Number(id_filme))

            if(resultFilmeGenero){
                if(resultFilmeGenero.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.filme_genero = resultFilmeGenero

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
const listarFilmesIdGenero = async function(id_genero){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if(!isNaN(id_genero) && id_genero != '' && id_genero != null && id_genero > 0){
            //Chama a função do DAO
            let resultFilmeGenero = await filmeGeneroDAO.getSelectMoviesByIdGenres(Number(id_genero))

            if(resultFilmeGenero){
                if(resultFilmeGenero.length > 0){
                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.filme_genero = resultFilmeGenero

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
const inserirFilmeGenero = async function(filmeGenero, contentType){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDadosFilmeGenero(filmeGenero)

            if(!validar){
                //Processamento
                //Chama a função para inserir um novo genero no banco de dados
                let resultFilmeGenero = await filmeGeneroDAO.setInsertMoviesGenres(filmeGenero)
                
                if(resultFilmeGenero){
                    //Chama a função para receber o ID gerado no BD
                    let lastId = await filmeGeneroDAO.getSelectLastId()

                    if(lastId){
                        //Adiciona o ID no JSON de dados do filme
                        filmeGenero.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATE_ITEM.message
                        MESSAGES.DEFAULT_HEADER.response = filmeGenero
                    
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
const atualizarFilmeGenero = async function(filmeGenero, id, contentType){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validar todos os dados
            let validar = await validarDadosFilmeGenero(filmeGenero)

            if(!validar){

                //Validação do ID, chamando a Controller que verifica no BD se o ID existe e valida o ID
                let validarId = await buscarFilmeGeneroId(id)

                if(validarId.status_code == 200){

                    //Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                    filmeGenero.id = Number(id)

                    //Processamento
                    //Chama a função para inserir um novo filme no banco de dados
                    let resultFilmeGenero = await filmeGeneroDAO.setUpdateMoviesGenres(filmeGenero)
                
                    if(resultFilmeGenero){
                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.response.filme_genero = filmeGenero
                    
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
const excluirFilmeGenero = async function(id){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarId = await buscarFilmeGeneroId(id)

            if(validarId.status_code == 200){

                //Chama a função do DAO
                let resultFilmeGenero = await filmeGeneroDAO.setDeleteMoviesGenres(Number(id))

                if(resultFilmeGenero){

                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.response.filme_genero = resultFilmeGenero

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

const validarDadosFilmeGenero = async function(filmeGenero){
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if (filmeGenero.id_filme == '' || filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || isNaN(filmeGenero.id_filme || filmeGenero.id_filme <= 0)) {
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_filme incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    } else if(filmeGenero.id_genero == '' || filmeGenero.id_genero == undefined || filmeGenero.id_genero == null || isNaN(filmeGenero.id_genero || filmeGenero.id_genero <= 0)){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [id_genero incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarFilmesGeneros,
    buscarFilmeGeneroId,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    listarGenerosIdFilme,
    listarFilmesIdGenero
}