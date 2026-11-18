var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT p.idPrato as id, p.notaPessoal as nota, p.nome as nome, c.nome as categoria, o.nome as origem, p.dificuldade as dificuldade, p.tempoPreparo as tempo
    FROM prato as p
    JOIN categoria as c ON p.fkCategoria = c.idCategoria
    JOIN origem as o ON p.fkOrigem = o.idOrigem`;
    
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function listarCategorias() {
    var instrucaoSql = `
    SELECT idCategoria AS id, nome FROM categoria ORDER BY nome
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarOrigens() {
    var instrucaoSql = `
    SELECT idOrigem AS id, nome FROM origem ORDER BY nome
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, categoria, origem, pessoa, dificuldade, tempo, nota) {
    var instrucaoSql = `
        INSERT INTO prato (nome, fkCategoria, fkOrigem, fkPessoa, dificuldade, tempoPreparo, notaPessoal)
        VALUES (?, ?, ?, ?, ?, ?, ?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [nome, categoria, origem, pessoa, dificuldade, tempo, nota]);
}

function listarIngredientes() {
    var instrucaoSql = `
        SELECT pi.fkPrato AS idPrato, i.nome AS ingrediente
        FROM prato_ingrediente AS pi
        JOIN ingrediente AS i ON pi.fkIngrediente = i.idIngrediente
        ORDER BY i.nome;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarCategorias,
    listarOrigens,
    cadastrar,
    listarIngredientes
}