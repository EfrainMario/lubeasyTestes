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
router.route('/avaliacoesrestaurantes')
    .get(function (req, res) {
        const AvaliacaoRestauranteClass = require("../controller/AvaliacaoRestauranteController");
        new AvaliacaoRestauranteClass(req, res).GetAvaliacaoRestaurante();
    });

router.route('/avaliacoesrestaurantes/:id')
    .get(function (req, res) {
        const AvaliacaoRestauranteClass = require("../controller/AvaliacaoRestauranteController");
        new AvaliacaoRestauranteClass(req, res).GetAvaliacaoRestaurante();
    });

module.exports = router;