class AvaliacaoProdutoController{
    static request;
    static avaliacaoProdutoDao;
    static helper;
    //response;
    constructor(req, res) {
        let HelperClass = require('../util/GeralHelper');
        AvaliacaoProdutoController.helper = new HelperClass(req, res);
        AvaliacaoProdutoController.request = req;
        AvaliacaoProdutoController.avaliacaoProdutoDao = require('../model/avaliacaoProdutoDao');
        //this.response = res;
    }
    GetAvaliacaoProduto() {
        AvaliacaoProdutoController.helper.verifyParams(function () {
            AvaliacaoProdutoController.request.params.idRestaurante = AvaliacaoProdutoController.request.RestauranteId;
            AvaliacaoProdutoController.avaliacaoProdutoDao.read(AvaliacaoProdutoController.request.params, AvaliacaoProdutoController.helper.responseWithJson);
        });
    }
}

module.exports = AvaliacaoProdutoController;