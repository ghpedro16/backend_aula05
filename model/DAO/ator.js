/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos atores dos filmes
 * Data: 12/11/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

const getSelectAllActors = async function(){
    try {
        //Script sql
        let sql = `select * from tbl_ator order by id_ator desc`

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

const getSelectActorById = async function(id){
    try {
        //Script sql
        let sql = `select * from tbl_ator where id_ator = ${id}`

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
        let sql = `SELECT id_ator FROM tbl_ator ORDER BY id_ator DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)
        
        if(Array.isArray(result))
            return Number(result[0].id_personagem)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertActor = async function(ator){
    try {
        //Script sql
        let sql = `INSERT INTO tbl_ator (nome, data_nascimento, descricao, foto)
	            VALUES('${ator.nome}',
	            '${ator.data_nascimento}',
	            '${ator.descricao}',
	            '${ator.foto}')`        

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateActor = async function (ator){
    try {
        //Script sql
        let sql = `UPDATE tbl_ator SET 
        nome = '${ator.nome}', 
        data_nascimento = '${ator.data_nascimento}', 
        descricao = '${ator.descricao}', 
        foto = '${ator.foto}' 
        WHERE id_ator = ${ator.id}`

        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteActor = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_ator WHERE id_ator = ${id}`

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
    getSelectAllActors,
    getSelectActorById,
    getSelectLastId,
    setInsertActor,
    setUpdateActor,
    setDeleteActor
}