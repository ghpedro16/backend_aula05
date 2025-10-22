/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente a classificacao indicativa do filme
 * Data: 22/10/2025
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

//Insere uma nova classificacao indicativa no banco de dados
const setInsertClassification = async function(classificacao){
    
}

//Atualiza uma classificacao indicativa existente no banco de dados
const setUpdateClassification = async function(classificacao){
    
}

//Deleta uma classificacao indicativa do banco de dados
const setDeleteClassification = async function(id){

}

module.exports = {
    getSelectAllClassification,
    getSelectClassificationById
}