var pratosModel = require("../models/pratosModel");

function listar(req, res) {
    pratosModel.listar().then(function (resultado) {
        res.status(200).json(resultado);
        // se for 204 se a linha chegar vazia ela quebra no resposta.json antes de chegar no if
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os pratos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
module.exports = {
    listar
}