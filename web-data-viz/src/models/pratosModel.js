var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT p.nome as Nome, c.nome as Categoria, o.nome as Origem, p.dificuldade as Dificuldade, p.tempoPreparo as Tempo
    FROM prato as p
    JOIN categoria as c ON p.fkCategoria = c.idCategoria
    JOIN origem as o ON p.fkOrigem = o.idOrigem`;
    
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

module.exports = {
    listar
}