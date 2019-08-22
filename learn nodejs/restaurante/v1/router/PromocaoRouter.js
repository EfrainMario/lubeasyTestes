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


router.post('/promocoes/:id/actualizarimagem',function (req, res) {
        const PromocaoClass = require("../controller/PromocaoController");
        new PromocaoClass(req, res).PostActualizarImagem();
    });
router.route('/promocoes/:id')
    .get(function (req, res) {
        const PromocaoClass = require("../controller/PromocaoController");
        new PromocaoClass(req, res).GetPromocao();
    })
    .put(function (req, res) {
        const PromocaoClass = require("../controller/PromocaoController");
        new PromocaoClass(req, res).PutActualizar();
    })
    .delete(function (req, res) {
        const PromocaoClass = require("../controller/PromocaoController");
        new PromocaoClass(req, res).DeletePromocao();
    });

router.route('/promocoes')
    .post(function (req, res) {
        const PromocaoClass = require("../controller/PromocaoController");
        new PromocaoClass(req, res).PostCriarPromocao();
    })
    .get(function (req, res) {
        const PromocaoClass = require("../controller/PromocaoController");
        console.log(req.body);
        new PromocaoClass(req, res).GetPromocao();
    });
module.exports = router;