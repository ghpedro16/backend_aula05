/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a classificacao indicativa do filme
 * Data: 29/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Retorna todas as classificacoes indicativas existentes
const getSelectAllClassification = async function(){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_classificacao ORDER BY id_classificacao DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma classificacao indicativa recebendo o id como parâmetro
const getSelectClassificationById = async function(id){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_classificacao WHERE id_classificacao = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna o ultimo filme cadastrado no banco de dados
const getSelectLastId = async function(){
    try {
        //Script sql para retornar apenas o ultimo id do banco
        let sql = `SELECT id_classificacao FROM tbl_classificacao ORDER BY id_classificacao DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id_classificacao)
        else
            return false

    } catch (error) {
        return false
    }
}

//Insere uma nova classificacao indicativa no banco de dados
const setInsertClassification = async function(classificacao){
    try {
        //Script sql
        let sql = `INSERT INTO tbl_classificacao (simbolo, classificacao_indicativa, descricao)
	            VALUES('${classificacao.simbolo}',
	            '${classificacao.classificacao_indicativa}',
	            '${classificacao.descricao}')`
    
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Atualiza uma classificacao indicativa existente no banco de dados
const setUpdateClassification = async function(classificacao){
    try {
        //Script sql
        let sql = `UPDATE tbl_classificacao SET 
        simbolo = '${classificacao.simbolo}',
        classificacao_indicativa = '${classificacao.classificacao_indicativa}',
        descricao = '${classificacao.descricao}'
        WHERE id_classificacao = ${classificacao.id_classificacao}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

//Deleta uma classificacao indicativa do banco de dados
const setDeleteClassification = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_classificacao WHERE id_classificacao = ${id}`

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
    getSelectAllClassification,
    getSelectClassificationById,
    getSelectLastId,
    setInsertClassification,
    setUpdateClassification,
    setDeleteClassification
}