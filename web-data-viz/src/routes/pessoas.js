var express = require("express");
var router = express.Router();

var pessoasController = require("../controllers/pessoasController");

router.post("/cadastrar", function (req, res) {
    pessoasController.cadastrar(req, res);
});

router.get("/listar", function (req, res) {
    pessoasController.listar(req, res);
});


module.exports = router;