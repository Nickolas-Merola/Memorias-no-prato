var database = require("../database/config");

function listar() {
    var instrucaoSql = `SELECT p.idPrato as id, p.notaPessoal as nota, p.nome as nome, c.nome as categoria, o.nome as origem, p.dificuldade as dificuldade, p.tempoPreparo as tempo
    FROM prato as p
    JOIN categoria as c ON p.fkCategoria = c.idCategoria
    JOIN origem as o ON p.fkOrigem = o.idOrigem`;
    
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, fkEmpresa) {

    var instrucaoSql = `
        INSERT INTO prato (nome, email, senha) VALUES (?,?,?);
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql,[nome,email,senha]);
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

module.exports = {
    listar,
    listarCategorias,
    listarOrigens,
    cadastrar
}