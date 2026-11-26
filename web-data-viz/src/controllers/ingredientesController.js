var ingredientesModel = require("../models/ingredientesModel");
var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var tipo = req.body.tipoServer;
    var idUsuario = req.body.idUsuarioServer;

    if (nome == undefined || nome.trim() == "") {
        res.status(400).send("O nome está vazio!");
    } else if (nome.trim().length > 50) {
        res.status(400).send("O nome pode ter no máximo 50 caracteres!");
    } else if (tipo == undefined || tipo.trim() == "") {
        res.status(400).send("Escolha um tipo!");
    } else if (idUsuario == undefined) {
        res.status(403).send("Você precisa estar logado!");
    } else {

        usuarioModel.buscarAutorizacao(idUsuario)
            .then(function (resultadoUsuario) {
                if (resultadoUsuario.length == 0 || resultadoUsuario[0].autorizado != 1) {
                    res.status(403).send("Você não tem permissão para cadastrar ingredientes!");
                } else {
                    ingredientesModel.cadastrar(nome.trim(), tipo.trim())
                        .then(function (resultado) {
                            res.status(201).json(resultado);
                        }).catch(function (erro) {
                            console.log(erro);
                            console.log("\nHouve um erro ao cadastrar o ingrediente! Erro: ", erro.sqlMessage);
                            if (erro.code == "ER_DUP_ENTRY") {
                                res.status(409).send("Esse ingrediente já está cadastrado!");
                            } else {
                                res.status(500).json(erro.sqlMessage);
                            }
                        });
                }
            }).catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao verificar a autorização! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarTipos(req, res) {
    ingredientesModel.listarTipos().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os tipos de ingrediente: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    cadastrar,
    listarTipos
}