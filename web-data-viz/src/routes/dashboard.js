var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/kpis", function (req, res) {
    dashboardController.buscarKpis(req, res);
});

router.get("/categorias", function (req, res) {
    dashboardController.pratosPorCategoria(req, res);
});

router.get("/ingredientes", function (req, res) {
    dashboardController.ingredientesMaisUsados(req, res);
});

router.get("/memorias", function (req, res) {
    dashboardController.memoriasPorAno(req, res);
});

router.get("/memoriasPessoas", function (req, res) {
    dashboardController.memoriasPorPessoa(req, res);
});

module.exports = router