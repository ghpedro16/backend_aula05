/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento de atores e personagens dos filmes
 * Data: 20/11/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

const getSelectAllActorsCharacters = async function(){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_ator_personagem ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else
            return false

    } catch (error) {
        return false
    }
}

const getSelectActorCharacterById = async function(id){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_ator_personagem WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
} 

const getSelectActorsCharactersByIdMovies = async function(id_filme){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT tbl_ator.id_ator, tbl_ator.nome as ator, tbl_personagem.id_personagem, tbl_personagem.nome as personagem 
                FROM tbl_ator inner join tbl_ator_personagem
                ON tbl_ator.id_ator = tbl_ator_personagem.id_ator
                inner join tbl_personagem
                ON tbl_personagem.id_personagem = tbl_ator_personagem.id_personagem 
                WHERE tbl_ator_personagem.id_filme = ${id_filme}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectCharactersMoviesByIdActors = async function(id_ator){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT tbl_personagem.id_personagem, tbl_personagem.nome as personagem, tbl_filme.id, tbl_filme.nome as filme
                FROM tbl_personagem inner join tbl_ator_personagem
                ON tbl_personagem.id_personagem = tbl_ator_personagem.id_personagem
                inner join tbl_filme
                ON tbl_filme.id = tbl_ator_personagem.id_filme
                WHERE tbl_ator_personagem.id_ator = ${id_ator}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectActorsMoviesByIdCharacters = async function(id_personagem){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT tbl_ator.id_ator, tbl_ator.nome as ator, tbl_filme.id, tbl_filme.nome as filme
                FROM tbl_filme inner join tbl_ator_personagem
                ON tbl_filme.id = tbl_ator_personagem.id_filme
                inner join tbl_ator
                ON tbl_ator.id_ator = tbl_ator_personagem.id_ator
                WHERE tbl_ator_personagem.id_personagem = ${id_personagem}`

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
        let sql = `SELECT id FROM tbl_ator_personagem ORDER BY id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertActorCharacter = async function(atorPersonagem){
    try {
        //Script sql
        let sql = `INSERT INTO tbl_ator_personagem (id_ator, id_personagem, id_filme)
                VALUES(${atorPersonagem.id_ator}, ${atorPersonagem.id_personagem}, ${atorPersonagem.id_filme})`
    
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateActorCharacter = async function(atorPersonagem){
    try {
        //Script sql
        let sql = `UPDATE tbl_ator_personagem SET 
        id_ator = ${atorPersonagem.id_ator},
        id_personagem = ${atorPersonagem.id_personagem},
        id_filme = ${atorPersonagem.id_filme}
        WHERE id = ${atorPersonagem.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteActorCharacter = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_ator_personagem WHERE id = ${id}`

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
    getSelectAllActorsCharacters,
    getSelectActorCharacterById,
    getSelectActorsCharactersByIdMovies,
    getSelectCharactersMoviesByIdActors,
    getSelectActorsMoviesByIdCharacters,
    getSelectLastId,
    setInsertActorCharacter,
    setUpdateActorCharacter,
    setDeleteActorCharacter
}