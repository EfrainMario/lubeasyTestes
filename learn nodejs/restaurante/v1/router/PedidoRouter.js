var express = require('express');
var router = express.Router();



//router.all('*', requireAuthentication, loadUser);

router.route('/pedidos/list')
    .get(function (req, res) {
        const PedidoClass = require("../controller/PedidoController");
        new PedidoClass(req, res).GetPedidosForList();
    });
router.route('/pedidos/list/hoje')
    .get(function (req, res) {
        const PedidoClass = require("../controller/PedidoController");
        new PedidoClass(req, res).GetPedidosForList(true);
    });
router.route('/pedidos/pesquisar/nomecliente/:nome')
    .get(function (req, res) {
        const PedidoClass = require("../controller/PedidoController");
        new PedidoClass(req, res).GetPedidosPesquisarPorNome();
    });

router.route('/pedidos/:id')
    .get(function (req, res) {
        const PedidoClass = require("../controller/PedidoController");
        new PedidoClass(req, res).GetPedidoForDetails();
    })
    .put(function (req, res) {
        const PedidoClass = require("../controller/PedidoController");
        new PedidoClass(req, res).PutActualizar();
    });



module.exports = router;