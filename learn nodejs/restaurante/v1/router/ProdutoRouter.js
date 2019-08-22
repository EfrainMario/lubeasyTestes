var express = require('express');
var router = express.Router();


router.route('/produtos')
    .post(function (req, res) {
        const ProdutoClass = require("../controller/ProdutoController");
        console.log(req.body);
        new ProdutoClass(req, res).PostCriarProduto();
    })
    .get(function (req, res) {
        const ProdutoClass = require("../controller/ProdutoController");
        new ProdutoClass(req, res).GetProduto();
    });
router.post('/produtos/:id/actualizarimagem',function (req, res) {
    const ProdutoClass = require("../controller/ProdutoController");
    new ProdutoClass(req, res).PostActualizarImagem();
});
router.route('/produtos/:id')
    .get(function (req, res) {
        const ProdutoClass = require("../controller/ProdutoController");
        new ProdutoClass(req, res).GetProduto();
    })
    .put(function (req, res) {
        const ProdutoClass = require("../controller/ProdutoController");
        new ProdutoClass(req, res).PutActualizar();
    })
    .delete(function (req, res) {
        const ProdutoClass = require("../controller/ProdutoController");
        new ProdutoClass(req, res).DeleteProduto();
    });

module.exports = router;