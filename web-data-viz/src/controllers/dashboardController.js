var dashboardModel = require("../models/dashboardModel");

function buscarKpis(req, res) {
    dashboardModel.buscarKpis().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as kpis: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function pratosPorCategoria(req, res) {
    dashboardModel.pratosPorCategoria().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as categorias: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function ingredientesMaisUsados(req, res) {
    dashboardModel.ingredientesMaisUsados().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os ingredientes: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function memoriasPorPessoa(req, res) {
    dashboardModel.memoriasPorPessoa().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as pessoas: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function memoriasPorAno(req, res) {
    dashboardModel.memoriasPorAno().then(function (resultado) {
        res.status(200).json(resultado);
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os anos: ", erro.sqlMessage);
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