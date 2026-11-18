var express = require("express");
var router = express.Router();

var memoriasController = require("../controllers/memoriasController");

router.get("/listar", function (req, res) {
    memoriasController.listar(req, res);
});

module.exports = router