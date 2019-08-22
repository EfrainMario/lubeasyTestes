class AvaliacaoRestauranteController{
    static request;
    static avaliacaoRestauranteDao;
    static helper;
    //response;
    constructor(req, res) {
        let HelperClass = require('../util/GeralHelper');
        AvaliacaoRestauranteController.helper = new HelperClass(req, res);
        AvaliacaoRestauranteController.request = req;
        AvaliacaoRestauranteController.avaliacaoRestauranteDao = require('../model/avaliacaoRestauranteDao');
        //this.response = res;
    }
    GetAvaliacaoRestaurante() {
        AvaliacaoRestauranteController.helper.verifyParams(function () {
            AvaliacaoRestauranteController.request.params.idRestaurante = AvaliacaoRestauranteController.request.RestauranteId;
            AvaliacaoRestauranteController.avaliacaoRestauranteDao.read(AvaliacaoRestauranteController.request.params, AvaliacaoRestauranteController.helper.responseWithJson);
        });
    }
}

module.exports = AvaliacaoRestauranteController;