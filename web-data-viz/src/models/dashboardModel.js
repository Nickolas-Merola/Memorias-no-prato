var database = require("../database/config");

function buscarKpis() {
    var instrucaoSql = `
        SELECT (SELECT COUNT(*) FROM prato) AS totalPratos,
        (SELECT ROUND(AVG(notaPessoal), 1) FROM prato) AS notaMedia,
        (SELECT COUNT(*) FROM memoria) AS totalMemorias,
        (SELECT COUNT(*) FROM pessoa) AS totalPessoas;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pratosPorCategoria() {
    var instrucaoSql = `
        SELECT c.nome AS categoria, COUNT(p.idPrato) AS total
        FROM prato AS p
        JOIN categoria AS c ON p.fkCategoria = c.idCategoria
        GROUP BY c.nome
        ORDER BY total DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function ingredientesMaisUsados() {
    var instrucaoSql = `
        SELECT i.nome AS ingrediente, COUNT(*) AS total
        FROM prato_ingrediente AS pi
        JOIN ingrediente AS i ON pi.fkIngrediente = i.idIngrediente
        WHERE i.tipo NOT IN ('Tempero', 'Gordura')
        GROUP BY i.nome
        ORDER BY total DESC, i.nome
        LIMIT 8;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function memoriasPorPessoa() {
    var instrucaoSql = `
        SELECT COALESCE(pe.Apelido, 'Sem pessoa') AS pessoa, COUNT(m.idMemoria) AS total
        FROM memoria AS m
        JOIN prato AS p ON m.fkPrato = p.idPrato
        LEFT JOIN pessoa AS pe ON p.fkPessoa = pe.idPessoa
        GROUP BY pessoa
        ORDER BY total DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function memoriasPorAno() {
    var instrucaoSql = `
       SELECT ano, COUNT(*) AS total
        FROM memoria
        GROUP BY ano
        ORDER BY ano;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarKpis,
    pratosPorCategoria,
    ingredientesMaisUsados,
    memoriasPorPessoa,
    memoriasPorAno
};