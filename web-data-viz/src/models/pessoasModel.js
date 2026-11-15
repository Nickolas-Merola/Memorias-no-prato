var database = require("../database/config");

function cadastrar(apelido, relacao) {
    var instrucaoSql = `
        INSERT INTO pessoa (Apelido, relacao) VALUES (?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [apelido, relacao]);
}

function listar() {
    var instrucaoSql = `
    SELECT idPessoa AS id, Apelido AS apelido, relacao ORDER BY Apelido
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listar
};