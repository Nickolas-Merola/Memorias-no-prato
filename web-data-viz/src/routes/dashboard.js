var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.post("/kpis", function (req, res) {
    dashboardController.buscarKpis(req, res);
});

router.post("/categorias", function (req, res) {
    dashboardController.pratosPorCategoria(req, res);
});

router.post("/ingredientes", function (req, res) {
    dashboardController.ingredientesMaisUsados(req, res);
});

router.post("/memorias", function (req, res) {
    dashboardController.memoriasPorAno(req, res);
});

router.post("/memoriasPessoas", function (req, res) {
    dashboardController.memoriasPorPessoa(req, res);
});

module.exports = router