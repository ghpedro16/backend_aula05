/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente aos generos de filmes
 * Data: 29/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

const getSelectAllGenres = async function(){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_genero ORDER BY id_genero DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else
            return false

    } catch (error) {
        return false
    }
}

const getSelectGenreById = async function(id){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_genero WHERE id_genero = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertGenre = async function(genero){
    try {
        //Script sql
        let sql = `INSERT INTO tbl_genero (nome)
	            VALUES('${genero.nome}')`
    
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateGenre = async function(genero){
    try {
        //Script sql
        let sql = `UPDATE tbl_genero SET 
        nome = '${genero.nome}'
        WHERE id_genero = ${genero.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteGenre = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_genero WHERE id_genero = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}