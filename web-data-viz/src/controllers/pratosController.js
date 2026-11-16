var pratosModel = require("../models/pratosModel");
var usuarioModel = require("../models/usuarioModel");

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

function listarCategorias(req, res) {
    pratosModel.listarCategorias().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as categorias: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarOrigens(req, res) {
    pratosModel.listarOrigens().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as origens: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
    var nome = req.body.nomeServer;
    var categoria = req.body.categoriaServer;
    var origem = req.body.origemServer;
    var pessoa = req.body.pessoaServer;
    var dificuldade = Number(req.body.dificuldadeServer);
    var tempo = Number(req.body.tempoServer);
    var nota = Number(req.body.notaServer);
    var idUsuario = req.body.idUsuarioServer;

    if (pessoa == undefined || pessoa == "") {
        pessoa = null;
    }

    if (nome == undefined || nome.trim() == "") {
        res.status(400).send("O nome do prato está vazio!");
    } else if (nome.trim().length > 50) {
        res.status(400).send("O nome do prato pode ter no máximo 50 caracteres!");
    } else if (categoria == undefined || categoria == "") {
        res.status(400).send("Escolha uma categoria!");
    } else if (origem == undefined || origem == "") {
        res.status(400).send("Escolha uma origem!");
    } else if (!Number.isInteger(dificuldade) || dificuldade < 1 || dificuldade > 5) {
        res.status(400).send("A dificuldade precisa ser um número de 1 a 5!");
    } else if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
        res.status(400).send("A nota precisa ser um número de 1 a 5!");
    } else if (!Number.isInteger(tempo) || tempo < 1) {
        res.status(400).send("O tempo de preparo precisa ser um número inteiro de minutos, maior que zero!");
    } else if (idUsuario == undefined) {
        res.status(403).send("Você precisa estar logado!");
    } else {

        usuarioModel.buscarAutorizacao(idUsuario)
            .then(function (resultadoUsuario) {
                if (resultadoUsuario.length == 0 || resultadoUsuario[0].autorizado != 1) {
                    res.status(403).send("Você não tem permissão para cadastrar pratos!");
                } else {
                    pratosModel.cadastrar(nome.trim(), categoria, origem, pessoa, dificuldade, tempo, nota)
                        .then(function (resultado) {
                            res.status(201).json(resultado);
                        }).catch(function (erro) {
                            console.log(erro);
                            console.log("\nHouve um erro ao cadastrar o prato! Erro: ", erro.sqlMessage);
                            if (erro.code == "ER_NO_REFERENCED_ROW_2") {
                                res.status(400).send("Categoria, origem ou pessoa não existe no banco!");
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

module.exports = {
    listar,
    listarOrigens,
    listarCategorias,
    cadastrar
}