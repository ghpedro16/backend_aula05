/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pela manipulação de dados entre o app e a model para um CRUD de filmes
 * Data: 07/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0 (CRUD básico do filme, sem as relações com as outras tabelas)
 * Data: 05/11/2025
 * Versão: 1.1 (CRUD do filme, com relacionamento com a tabela de gênero)
 *******************************************************************************************************************************************************************/

//Import do model DAO do filme
const filmeDAO = require('../../model/DAO/filme.js')

//Import da controller da tabela relacionamento filme_genero
const controllerFilmeGenero = require('./controller_filme_genero.js')

//Import da controller da tabela relacionamento ator_personagem
const controllerAtorPersonagem = require('../ator/controller_ator_personagem.js')

//Import do arquivo de mensagens
const DEFAULT_MESSAGES = require('../modulo/config_messages.js')

//Retorna uma lista de todos os filmes
const listarFilmes = async function(){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))
    
    try {
        
        //Chama a função do DAO para retornar a lista de filmes do BD
        let resultFilmes = await filmeDAO.getSelectAllMovies()

        if(resultFilmes){
            if(resultFilmes.length > 0){
                //Processamento para adicionar os generos aos filmes
                for(filme of resultFilmes){
                    //Encaminha o JSON com o id do filme para a controller de filme_genero
                    let resultGeneros = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)

                    if(resultGeneros.status_code == 200){
                        filme.genero = resultGeneros.response.filme_genero
                    }
                }

                for(filme of resultFilmes){
                    //Encaminha o JSON com o id do filme para a controller de ator_personagem
                    let resultElenco  = await controllerAtorPersonagem.listarAtoresPersonagensIdFilme(filme.id)

                    if(resultElenco.status_code == 200){
                        filme.elenco = resultElenco.response.ator_personagem
                    }
                }

                MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                MESSAGES.DEFAULT_HEADER.response.filmes = resultFilmes

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

//Retorna um filme filtrando pelo ID 
const buscarFilmeId = async function(id){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {

        if(!isNaN(id) && id != '' && id != null && id > 0){
            //Chama a função do DAO
            let resultFilme = await filmeDAO.getSelectByIdMovies(Number(id))

            if(resultFilme){
                if(resultFilme.length > 0){

                    for(filme of resultFilme){
                        //Encaminha o JSON com o id do filme para a controller de filme_genero
                        let resultGenero = await controllerFilmeGenero.listarGenerosIdFilme(filme.id)

                        if(resultGenero.status_code == 200){
                            filme.genero = resultGenero.response.filme_genero
                        }
                    }

                    for(filme of resultFilme){
                    //Encaminha o JSON com o id do filme para a controller de ator_personagem
                    let resultElenco  = await controllerAtorPersonagem.listarAtoresPersonagensIdFilme(filme.id)

                    if(resultElenco.status_code == 200){
                        filme.elenco = resultElenco.response.ator_personagem
                    }
                }

                    MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_REQUEST.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_REQUEST.status_code
                    MESSAGES.DEFAULT_HEADER.response.filme = resultFilme

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

//Insere um filme
const inserirFilme = async function(filme, contentType){
    
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validar = await validarDadosFilme(filme)

            if(!validar){
                //Processamento
                //Chama a função para inserir um novo filme no banco de dados
                let resultFilme = await filmeDAO.setInsertMovies(filme)
                
                if(resultFilme){
                    //Chama a função para receber o ID gerado no BD
                    let lastId = await filmeDAO.getSelectLastId()

                    if(lastId){

                        //Processar a inserção dos dados na tabela de relação
                        //Entre filme e genero
                        //filme.genero.forEach(async function(genero){
                        //O forEach nao funciona bem com funcoes async por isso utilizar o for of
                        for(genero of filme.genero){
                            //Cria o JSON com o id do filme e o id do genero
                            let filmeGenero = {id_filme: lastId, id_genero: genero.id}

                            //Encaminha o JSON com o id do filme e do genero para a controller de filme_genero
                            let resultFilmeGenero = await controllerFilmeGenero.inserirFilmeGenero(filmeGenero, contentType)

                            if(resultFilmeGenero.status_code != 201){
                                return MESSAGES.ERROR_RELATIONAL_INSERTION
                            }
                        }

                        for(elenco of filme.elenco){
                            let atorPersonagem = {id_filme: lastId, id_ator: elenco.id_ator, id_personagem: elenco.id_personagem}

                            let resultAtorPersonagem = await controllerAtorPersonagem.inserirAtorPersonagem(atorPersonagem, contentType)

                            if(resultAtorPersonagem.status_code =! 201){
                                return MESSAGES.ERROR_RELATIONAL_INSERTION
                            }
                        }

                        //Adiciona o ID no JSON de dados do filme
                        filme.id = lastId

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_CREATE_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_CREATE_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_CREATE_ITEM.message

                        //Adicionar no JSON dados do genero
                        delete filme.genero
                        let resultDadosGenero = await controllerFilmeGenero.listarGenerosIdFilme(lastId)
                        filme.genero = resultDadosGenero.response.filme_genero

                        //Adicionar no JSON dados do elenco
                        delete filme.elenco
                        let resultDadosElenco = await controllerAtorPersonagem.listarAtoresPersonagensIdFilme(lastId)
                        filme.elenco = resultDadosElenco.response.ator_personagem

                        MESSAGES.DEFAULT_HEADER.response = filme
                    
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

//Atualiza um filme buscando pelo ID
const atualizarFilme = async function(filme, id, contentType){
    
    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        //Validação do tipo de conteúdo da requisição (OBRIGATÓRIO SER UM JSON)
        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //Chama a função de validar todos os dados
            let validar = await validarDadosFilme(filme)

            if(!validar){

                //Validação do ID, chamando a Controller que verifica no BD se o ID existe e valida o ID
                let validarId = await buscarFilmeId(id)

                if(validarId.status_code == 200){
                    //Adiciona o ID do filme no JSON de dados para ser encaminhado ao DAO
                    filme.id = Number(id)

                    //Processamento
                    //Chama a função para inserir um novo filme no banco de dados
                    let resultFilme = await filmeDAO.setUpdateMovies(filme)
                
                    if(resultFilme){
                        for(genero of filme.genero){
                            //Cria o JSON com o id do filme e o id do genero
                            let filmeGenero = {id_filme: filme.id, id_genero: genero.id}

                            //Encaminha o JSON com o id do filme e do genero para a controller de filme_genero
                            let resultFilmeGenero = await controllerFilmeGenero.atualizarFilmeGenero(filmeGenero, id, contentType)

                            if(resultFilmeGenero.status_code != 200){
                                return MESSAGES.ERROR_RELATIONAL_INSERTION
                            }
                        }

                        MESSAGES.DEFAULT_HEADER.status = MESSAGES.SUCCESS_UPDATED_ITEM.status
                        MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGES.DEFAULT_HEADER.message = MESSAGES.SUCCESS_UPDATED_ITEM.message
                        MESSAGES.DEFAULT_HEADER.response.filme = filme
                    
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

//Exclui um filme buscando pelo ID
const excluirFilme = async function(id){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    try {
        if(!isNaN(id) && id != '' && id != null && id > 0){

            //Validação de ID válido, chama a função da controller que verifica no BD se o ID existe e valida o ID
            let validarId = await buscarFilmeId(id)

            if(validarId.status_code == 200){

                //Chama a função do DAO
                let resultFilme = await filmeDAO.setDeleteMovies(Number(id))

                if(resultFilme){
                    MESSAGES.DEFAULT_HEADER.status      = MESSAGES.SUCCESS_DELETED_ITEM.status
                    MESSAGES.DEFAULT_HEADER.status_code = MESSAGES.SUCCESS_DELETED_ITEM.status_code
                    MESSAGES.DEFAULT_HEADER.message     = MESSAGES.SUCCESS_DELETED_ITEM.message
                    MESSAGES.DEFAULT_HEADER.response.filme = resultFilme

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

//Validação dos dados de cadastro e atualização do filme
const validarDadosFilme = async function(filme){

    //Criando um objeto novo para as mensagens
    let MESSAGES = JSON.parse(JSON.stringify(DEFAULT_MESSAGES))

    if(filme.nome == '' || filme.nome == undefined || filme.nome == null || filme.nome.length > 100){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Nome incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.sinopse == undefined){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Sinopse incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Data de lançamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.duracao == '' || filme.duracao == undefined || filme.duracao == null || filme.duracao.length > 8){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Duração incorreto]' 
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.orcamento == '' || filme.orcamento == undefined || filme.orcamento == null || filme.orcamento.length > 12 || typeof(filme.orcamento) != 'number'){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Orçamento incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.trailer == undefined || filme.trailer.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Trailer incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.capa == '' || filme.capa == undefined || filme.capa == null || filme.capa.length > 200){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Capa incorreto]'
        return MESSAGES.ERROR_REQUIRED_FIELDS

    }else if(filme.id_classificacao == '' || filme.id_classificacao == null || filme.id_classificacao == undefined || typeof(filme.id_classificacao) != 'int'){
        MESSAGES.ERROR_REQUIRED_FIELDS.message += ' [Foreign Key (id_classificacao) incorreta]'
    }else{
        return false
    }
}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    atualizarFilme,
    excluirFilme
}