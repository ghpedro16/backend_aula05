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
        let sql = `SELECT tbl_ator.id_ator, tbl_ator.nome, tbl_personagem.id_personagem, tbl_personagem.nome 
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

const getSelectCharactersByIdActors = async function(id_ator){

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

}

const setUpdateActorCharacter = async function(atorPersonagem){

}

const setDeleteActorCharacter = async function(id){

}