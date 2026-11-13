var database = require("../database/config");

function cadastrar(apelido, relacao) {
    var instrucaoSql = `
        INSERT INTO pessoa (Apelido, relacao) VALUES (?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [apelido, relacao]);
}

module.exports = {
    cadastrar
};