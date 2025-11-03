/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos personagens dos filmes
 * Data: 29/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

const getAllSelectCharacters = async function(){
    try {
        //Script sql
        let sql = `select * from tbl_personagem order by id_personagem desc`

        //Encaminha para o BD o script sql
        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const getSelectCharacterById = async function(id){
    try {
        //Script sql
        let sql = `select * from tbl_personagem where id_personagem = ${id}`

        //Encaminha para o BD o script sql
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
        let sql = `SELECT id FROM tbl_personagem ORDER BY id_personagem DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertCharacter = async function(personagem){
    try {
        //Script sql
        let sql = `INSERT INTO tbl_personagem (nome, descricao, ficticio, foto)
	            VALUES('${personagem.nome}',
	            '${personagem.descricao}',
	            '${personagem.ficticio}',
	            '${personagem.foto}')`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateCharacter = async function(personagem){
    try {
        //Script sql
        let sql = `UPDATE tbl_personagem SET 
        nome = '${personagem.nome}', 
        descricao = '${personagem.descricao}', 
        ficticio = '${personagem.ficticio}', 
        foto = '${personagem.foto}' 
        WHERE id_personagem = ${personagem.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteCharacter = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_personagem WHERE id_personagem = ${id}`

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
    getAllSelectCharacters,
    getSelectCharacterById,
    getSelectLastId,
    setInsertCharacter,
    setUpdateCharacter,
    setDeleteCharacter
}