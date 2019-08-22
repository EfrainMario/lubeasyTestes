var express = require('express');
var router = express.Router();



//router.all('*', requireAuthentication, loadUser);

router.route('/notificacoes/list')
    .get(function (req, res) {
        const NotificacaoClass = require("../controller/NotificacaoController");
        new NotificacaoClass(req, res).GetNotificacoesForList();
    });
router.route('/notificacoes/:id')
    .get(function (req, res) {
        const NotificacaoClass = require("../controller/NotificacaoController");
        new NotificacaoClass(req, res).GetNotificacaoForDetails();
    });



module.exports = router;