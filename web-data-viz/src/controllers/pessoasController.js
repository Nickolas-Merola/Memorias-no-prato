var pessoasModel = require("../models/pessoasModel");
var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    var apelido = req.body.apelidoServer;
    var relacao = req.body.relacaoServer;
    var idUsuario = req.body.idUsuarioServer;

    if (apelido == undefined || apelido.trim() == "") {
        res.status(400).send("O apelido está vazio!");
    } else if (relacao == undefined || relacao.trim() == "") {
        res.status(400).send("A relação está vazia!");
    } else if (apelido.length > 50 || relacao.length > 50) {
        res.status(400).send("Apelido e relação podem ter no máximo 50 caracteres!");
    } else if (idUsuario == undefined) {
        res.status(403).send("Você precisa estar logado!");
    } else {

        usuarioModel.buscarAutorizacao(idUsuario)
            .then(function (resultadoUsuario) {
                if (resultadoUsuario.length == 0 || resultadoUsuario[0].autorizado != 1) {
                    res.status(403).send("Você não tem permissão para cadastrar pessoas!");
                } else {
                    pessoasModel.cadastrar(apelido.trim(), relacao.trim())
                        .then(function (resultado) {
                            res.status(201).json(resultado);
                        }).catch(function (erro) {
                            console.log(erro);
                            console.log("\nHouve um erro ao cadastrar a pessoa! Erro: ", erro.sqlMessage);
                            res.status(500).json(erro.sqlMessage);
                        });
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao verificar a autorização! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    cadastrar
};