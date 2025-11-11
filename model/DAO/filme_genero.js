/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao relacionamento entre filme e genero
 * Data: 05/11/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//Lista todos os filmes e generos
const getSelectAllMoviesGenres = async function(){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_filme_genero ORDER BY id DESC`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result)){
            return result
        }else
            return false

    } catch (error) {
        return false
    }
}

//Retorna um filme e genero pelo id
const getSelectMovieGenreById = async function(id){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT * FROM tbl_filme_genero WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma lista de generos filtrando pelo id do filme
const getSelectGenresByIdMovies = async function(id_filme){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT tbl_genero.id_genero, tbl_genero.nome 
                FROM tbl_filme inner join tbl_filme_genero
                ON tbl_filme.id = tbl_filme_genero.id_filme
                inner join tbl_genero
                ON tbl_genero.id_genero = tbl_filme_genero.id_genero 
                WHERE tbl_filme.id = ${id_filme}`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

//Retorna uma lista de filmes filtrando pelo id do genero
const getSelectMoviesByIdGenres = async function(id_genero){
    try {
        //Script sql para retornar os dados
        let sql = `SELECT tbl_filme.id, tbl_filme.nome 
                FROM tbl_filme inner join tbl_filme_genero
                ON tbl_filme.id = tbl_filme_genero.id_filme
                inner join tbl_genero
                ON tbl_genero.id_genero = tbl_filme_genero.id_genero 
                WHERE tbl_genero.id_genero = ${id_genero}`

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
        let sql = `SELECT id FROM tbl_filme_genero ORDER BY id DESC LIMIT 1`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

const setInsertMoviesGenres = async function(filmeGenero){
    try {
        //Script sql
        let sql = `INSERT INTO tbl_filme_genero (id_filme, id_genero)
                VALUES(${filmeGenero.id_filme}, ${filmeGenero.id_genero})`
    
        let result = await prisma.$executeRawUnsafe(sql)
        
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setUpdateMoviesGenres = async function(filmeGenero){
    try {
        //Script sql
        let sql = `UPDATE tbl_filme_genero SET 
        id_filme = ${filmeGenero.id_filme},
        id_genero = ${filmeGenero.id_genero}
        WHERE id = ${filmeGenero.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
}

const setDeleteMoviesGenres = async function(id){
    try {
        //Script sql
        let sql = `DELETE FROM tbl_filme_genero WHERE id = ${id}`

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
    getSelectAllMoviesGenres,
    getSelectMovieGenreById,
    getSelectGenresByIdMovies,
    getSelectMoviesByIdGenres,
    getSelectLastId,
    setInsertMoviesGenres,
    setUpdateMoviesGenres,
    setDeleteMoviesGenres
}