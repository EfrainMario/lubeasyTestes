var express = require('express');
var router = express.Router();



//router.all('*', requireAuthentication, loadUser);
/*router.use( function (req, res, next) {
    if(req.method.toUpperCase() !== 'POST' && req.method.toUpperCase() !== 'GET'){
        console.log(req.method);
        const webTokenClass = require('../util/WebToken');
        new webTokenClass(req, res).authenticateToken(next);
    }
});*/
router.route('/produtos/:idProduto/avaliacoesProdutos')
    .get(function (req, res) {
        const AvaliacaoProdutoClass = require("../controller/AvaliacaoProdutoController");
        new AvaliacaoProdutoClass(req, res).GetAvaliacaoProduto();
    });

router.route('/produtos/:idProduto/avaliacoesProdutos/:id')
    .get(function (req, res) {
        const AvaliacaoProdutoClass = require("../controller/AvaliacaoProdutoController");
        new AvaliacaoProdutoClass(req, res).GetAvaliacaoProduto();
    });

module.exports = router;