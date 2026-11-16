var express = require("express");
var router = express.Router();

var pratosController = require("../controllers/pratosController");

router.get("/listar", function (req, res) {
    pratosController.listar(req, res);
});

router.get("/categorias", function (req, res) {
    pratosController.listarCategorias(req, res);
});

router.get("/origens", function (req, res) {
    pratosController.listarOrigens(req, res);
});

router.post("/cadastrar", function (req, res) {
    pratosController.cadastrar(req, res);
});

module.exports = router