/*******************************************************************************************************************************************************************
 * Objetivo: Arquivo responsável pelo CRUD de dados no MySQL referente ao filme
 * Data: 01/10/2025
 * Autor: Pedro Henrique Araújo da Silva
 * Versão: 1.0
 *******************************************************************************************************************************************************************/

/*
    Exemplos de dependencias para conexão com BD
        Banco de Dados relacionais
            Sequelize -> Foi utilizado em muitos projetos desde o inicio do node
            Prisma    -> É uma dependencia atual que trabalha com o BD (SQL ou ORM)
            Knex      -> É uma dependencia atual que trabalha com MySQL
            
            
        Banco de Dados não relacional    
            Mongoose  -> É uma dependencia para o Mongo DB (Não relacional)  
*/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('@prisma/client')

//Cria um novo objeto baseado na classe do PrismaClient
const prisma = new PrismaClient()

//$queryRawUnsafe    -> permite executar um script SQL de uma variavel e que retorna valores do banco (SELECT)
//$executeRawUnsafe  -> permite executar um script SQL de uma variavel e que NÃO retorna dados do banco (INSERT, UPDATE, DELETE)
//$queryRaw     -> permite executar um script SQL sem estar em uma variavel e que retorna valores do banco (SELECT) e faz tratamento contra SQL Injection
//$executeRaw   -> permite executar um script SQL sem estar em uma variavel e que NÃO retorna dados do banco (INSERT, UPDATE, DELETE) e faz tratamento contra SQL Injection

//Retorna uma lista de todos os filmes do banco de dados
const getSelectAllMovies = async function(){
    try {
        //Script sql
        let sql = `select * from tbl_filme order by id desc`

        //Encaminha para o BD o script sql
        let result = await prisma.$queryRawUnsafe(sql)

        if(result.length > 0)
            return result
        else
            return false

    } catch (error) {
        //console.log(error)
        return false
    }

}

//Retorna um filme filtrando por ID
const getSelectByIdMovies = async function(id){
    
} 

//Insere um filme novo no banco de dados
const setInsertMovies = async function (){
    
}

//Altera um filme no banco de dados
const setUpdateMovies = async function (id){
    
}

//Deleta um filme no banco de dados
const setDeleteMovies = async function (id){
    
}

module.exports = {
    getSelectAllMovies,
}