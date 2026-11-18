var express = require("express");
var router = express.Router();

var memoriasController = require("../controllers/memoriasController");

router.get("/listarMemorias", function (req, res) {
    memoriasController.buscarKpis(req, res);
});

module.exports = router