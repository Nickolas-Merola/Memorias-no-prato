var database = require("../database/config");

function cadastrar(nome, tipo) {
    var instrucaoSql = `
    INSERT INTO ingrediente (nome, tipo) VALUES (?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [nome, tipo]);
}

function listarTipos() {
    var instrucaoSql = `
    SELECT tipo FROM ingrediente
    WHERE tipo IS NOT NULL
    GROUP BY tipo
    ORDER BY tipo ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    listarTipos
};