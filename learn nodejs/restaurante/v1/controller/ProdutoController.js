class ProdutoController{
    static request;
    static produtoDao;
    static helper;
    //response;
    constructor(req, res) {
        let HelperClass = require('../util/GeralHelper');
        ProdutoController.helper = new HelperClass(req, res);
        ProdutoController.request = req;
        ProdutoController.produtoDao = require('../model/produtoDao');
        //this.response = res;
    }

    PostCriarProduto() {
        ProdutoController.helper.verifyBody(function () {
            ProdutoController.helper.verifyFile('imagem','produto',function () {
                ProdutoController.request.body.dataDeCriacao = ProdutoController.helper.PHPdateTime('Y-m-d h:i:s');
                ProdutoController.request.body.idRestaurante = ProdutoController.request.RestauranteId;
                ProdutoController.produtoDao.create(ProdutoController.request.body, ProdutoController.helper.responseWithText);
            });
        });
    }
    PostActualizarImagem() {
        //Todo Apagar a imagem Anterior
        ProdutoController.helper.verifyParams(function () {
            ProdutoController.helper.verifyFile('imagem','produto',function () {
                ProdutoController.request.body.idRestaurante = ProdutoController.request.RestauranteId;
                ProdutoController.request.body.id = ProdutoController.request.params.id;
                ProdutoController.produtoDao.update(ProdutoController.request.body, ProdutoController.helper.responseWithText);
            });
        });
    }
    GetProduto() {
        ProdutoController.helper.verifyParams(function () {
            ProdutoController.request.params.idRestaurante = ProdutoController.request.RestauranteId;
            ProdutoController.produtoDao.read(ProdutoController.request.params, ProdutoController.helper.responseWithJson);
        });
    }
    PutActualizar() {
        ProdutoController.helper.verifyParams(function () {
            ProdutoController.request.body.id = ProdutoController.request.params.id;
            ProdutoController.request.body.idRestaurante = ProdutoController.request.RestauranteId;
            if (ProdutoController.request.body.imagem !== undefined) {
                ProdutoController.request.body.imagem = undefined;
            }
            ProdutoController.produtoDao.update(ProdutoController.request.body, ProdutoController.helper.responseWithText);
        });
    }
    DeleteProduto() {
        ProdutoController.helper.verifyParams(function () {
            ProdutoController.request.params.idRestaurante = ProdutoController.request.RestauranteId;
            ProdutoController.produtoDao.delete(ProdutoController.request.params, ProdutoController.helper.responseWithText);
        });
    }

}

module.exports = ProdutoController;