var express = require("express");
var router = express.Router();

var ingredientesController = require("../controllers/ingredientesController");

router.post("/cadastrar", function (req, res) {
    ingredientesController.cadastrar(req, res);
});

router.get("/listarTipos", function (req, res) {
    ingredientesController.listarTipos(req, res);
});

module.exports = router