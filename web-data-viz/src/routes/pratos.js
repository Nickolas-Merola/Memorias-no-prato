var express = require("express");
var router = express.Router();

var pratosController = require("../controllers/pratosController");

router.get("/listar", function (req, res) {
    pratosController.listar(req, res);
});

module.exports = router