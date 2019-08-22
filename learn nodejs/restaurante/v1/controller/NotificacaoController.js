class NotificacaoController {
    static request;
    static notificacaoDao;
    static helper;
    //response;
    constructor(req, res) {
        let HelperClass = require('../util/GeralHelper');
        NotificacaoController.helper = new HelperClass(req, res);
        NotificacaoController.request = req;
        NotificacaoController.notificacaoDao = require('../model/NotificacaoDao');
        //this.response = res;
    }
    GetNotificacaoForDetails() {
        NotificacaoController.helper.verifyParams(function () {
            NotificacaoController.request.params.idRestaurante = NotificacaoController.request.RestauranteId;
            NotificacaoController.notificacaoDao.readOne(NotificacaoController.request.params, NotificacaoController.helper.responseWithJson);
        });
    }
    GetNotificacoesForList() {
        NotificacaoController.helper.verifyRestauranteId(function () {
            NotificacaoController.request.params.idRestaurante = NotificacaoController.request.RestauranteId;
            NotificacaoController.notificacaoDao.readList(NotificacaoController.request.params, NotificacaoController.helper.responseWithJson);
        });
    }

}

module.exports = NotificacaoController;