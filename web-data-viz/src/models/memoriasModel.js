var database = require("../database/config");

function listar() {
    var instrucaoSql = `
        SELECT m.idMemoria AS id, m.titulo, m.descricao, m.ano, p.nome AS prato
        FROM memoria AS m
        JOIN prato AS p ON m.fkPrato = p.idPrato
        ORDER BY m.ano;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar
};