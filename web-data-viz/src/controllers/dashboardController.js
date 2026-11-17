var dashboardModel = require("../models/dashboardModel");

function buscarKpis(req, res) {
    dashboardModel.listar().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os pratos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pratosPorCategoria(req, res) {
    dashboardModel.listar().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os pratos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function ingredientesMaisUsados(req, res) {
    dashboardModel.listar().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os pratos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function memoriasPorPessoa(req, res) {
    dashboardModel.listar().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os pratos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function memoriasPorAno(req, res) {
    dashboardModel.listar().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os pratos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarKpis,
    pratosPorCategoria,
    ingredientesMaisUsados,
    memoriasPorPessoa,
    memoriasPorAno
};