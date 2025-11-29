/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento de personagens e filmes
 * Data: 29/11/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

const getSelectAllCharactersMovies = async function(){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_personagem_filme ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else
            return false

    } catch (error) {
        return false
    }
}

const getSelectCharacterMovieById = async function(id){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_personagem_filme WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectCharactersByIdMovies = async function(id_filme){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT tbl_personagem.id_personagem, tbl_personagem.nome as personagem, tbl_filme.id, tbl_filme.nome as filme
                FROM tbl_filme inner join tbl_personagem_filme
                ON tbl_filme.id = tbl_personagem_filme.id_filme
                inner join tbl_personagem
                ON tbl_personagem.id_personagem = tbl_personagem_filme.id_personagem
                WHERE tbl_personagem_filme.id_filme = ${id_filme}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectMoviesByIdCharacters = async function(id_personagem){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT tbl_personagem.id_personagem, tbl_personagem.nome as personagem, tbl_filme.id, tbl_filme.nome as filme
                FROM tbl_filme inner join tbl_personagem_filme
                ON tbl_filme.id = tbl_personagem_filme.id_filme
                inner join tbl_personagem
                ON tbl_personagem.id_personagem = tbl_personagem_filme.id_personagem
                WHERE tbl_personagem_filme.id_personagem = ${id_personagem}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}


const getSelectLastId = async function(){
    try {
        //Script sql para retornar apenas o ultimo id do banco
        let sql = `SELECT id FROM tbl_personagem_filme ORDER BY id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertCharacterMovie = async function(personagemFilme){
    try {
        //Script sql
        let sql = `INSERT INTO tbl_personagem_filme (id_personagem, id_filme)
                VALUES(${personagemFilme.id_personagem}, ${personagemFilme.id_filme})`
    
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateCharacterMovie = async function(personagemFilme){
    try {
        //Script sql
        let sql = `UPDATE tbl_personagem_filme SET
        id_personagem = ${personagemFilme.id_personagem},
        id_filme = ${personagemFilme.id_filme}
        WHERE id = ${personagemFilme.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteCharacterMovie = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_personagem_filme WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectAllCharactersMovies,
    getSelectCharacterMovieById,
    getSelectCharactersByIdMovies,
    getSelectMoviesByIdCharacters,
    getSelectLastId,
    setInsertCharacterMovie,
    setUpdateCharacterMovie,
    setDeleteCharacterMovie
}
