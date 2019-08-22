class PedidoController{
    static request;
    static pedidoDao;
    static helper;
    //response;
    constructor(req, res) {
        let HelperClass = require('../util/GeralHelper');
        PedidoController.helper = new HelperClass(req, res);
        PedidoController.request = req;
        PedidoController.pedidoDao = require('../model/pedidoDao');
        //this.response = res;
    }
    GetPedidoForDetails() {
        PedidoController.helper.verifyParams(function () {
            PedidoController.request.params.idRestaurante = PedidoController.request.RestauranteId;
            PedidoController.pedidoDao.readOne(PedidoController.request.params, PedidoController.helper.responseWithJson);
        });
    }
    GetPedidosForList(today = false) {
        if(today) PedidoController.request.params.dataDeEmissao = PedidoController.helper.PHPdateTime('Y-m-d 00:00:00');
        PedidoController.helper.verifyRestauranteId(function () {
            PedidoController.request.params.idRestaurante = PedidoController.request.RestauranteId;
            PedidoController.pedidoDao.readList(PedidoController.request.params, PedidoController.helper.responseWithJson);
        });
    }
    GetPedidosPesquisarPorNome(today = false) {
        PedidoController.helper.verifyRestauranteId(function () {
            PedidoController.request.params.idRestaurante = PedidoController.request.RestauranteId;
            PedidoController.pedidoDao.readPesquisarPorNome(PedidoController.request.params, PedidoController.helper.responseWithJson);
        });
    }
    PutActualizar() {
        PedidoController.helper.verifyParams(function () {
            PedidoController.request.body.id = PedidoController.request.params.id;
            PedidoController.request.body.idRestaurante = PedidoController.request.RestauranteId;
            PedidoController.pedidoDao.update(PedidoController.request.body, PedidoController.helper.responseWithText);
        });
    }
    /*PostEstadoPedido() {
        PedidoController.helper.verifyParams(function () {
            PedidoController.request.body.id = PedidoController.request.params.id;
            PedidoController.pedidoDao.createEstadoPedido(PedidoController.request.body, PedidoController.helper.responseWithText);
        });
    }*/

}

module.exports = PedidoController;