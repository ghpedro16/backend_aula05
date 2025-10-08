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
                npm install prisma --save           -> Instalar o prisma (Conexao com o database);
                npm install @prisma/client -- save  -> Instalar o cliente do prisma (Executar scripts SQL no BD);
                npx prisma init --save              -> Prompt de comando para inicializar o prisma no projeto;
                npx prisma migrate dev              -> Realiza o sincronismo entre o prisma e o banco de dados 
                                                    (CUIDADO, nesse processo você poderá perder dados reais do BD, pois ele pega e cria as tabelas criadas no ORM)
                npx prisma generate                 -> Apenas realiza o sincronismo entre o prisma e o BD, geralmente usamos para rodar o projeto em um PC novo.                                    
            Knex      -> É uma dependencia atual que trabalha com MySQL
            
            
        Banco de Dados não relacional    
            Mongoose  -> É uma dependencia para o Mongo DB (Não relacional)  
*/

//Import da dependencia do Prisma que permite a execução de script SQL no BD
const {PrismaClient} = require('../../generated/prisma')

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

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}

//Retorna um filme filtrando por ID
const getSelectByIdMovies = async function(id){
    try {
        //Script sql
        let sql = `select * from tbl_filme where id = ${id}`

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
    getSelectByIdMovies
}