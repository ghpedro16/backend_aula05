/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao pais de origem relacionados a filmes, atores, entre outros
 * Data: 04/11/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

const getSelectAllCountrys = async function(){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_pais_origem ORDER BY id_pais_origem DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else
            return false

    } catch (error) {
        return false
    }
}

const getSelectCountryById = async function(id){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_pais_origem WHERE id_pais_origem = ${id}`

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
        let sql = `SELECT id_pais_origem FROM tbl_pais_origem ORDER BY id_pais_origem DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertCountry = async function(pais_origem){
    try {
        //Script sql
        let sql = `INSERT INTO tbl_pais_origem (nome)
                VALUES('${pais_origem.nome}')`
    
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateCountry = async function(pais_origem){
    try {
        //Script sql
        let sql = `UPDATE tbl_pais_origem SET
        nome = '${pais_origem.nome}'
        WHERE id_pais_origem = ${pais_origem.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteCountry = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_pais_origem WHERE id_pais_origem = ${id}`

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
    getSelectAllCountrys,
    getSelectCountryById,
    getSelectLastId,
    setInsertCountry,
    setUpdateCountry,
    setDeleteCountry
}