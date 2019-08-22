class PromocaoController{
    static request;
    static promocaoDao;
    static helper;
    //response;
    constructor(req, res) {
        let HelperClass = require('../util/GeralHelper');
        PromocaoController.helper = new HelperClass(req, res);
        PromocaoController.request = req;
        PromocaoController.promocaoDao = require('../model/promocaoDao');
        //this.response = res;
    }

    PostCriarPromocao() {
	console.log('hhh',PromocaoController.request.body);
        PromocaoController.helper.verifyBody(function () {
            PromocaoController.helper.verifyFile('imagem','promocao',function () {
                PromocaoController.request.body.dataDeCriacao = PromocaoController.helper.PHPdateTime('Y-m-d h:i:s');
                PromocaoController.request.body.idRestaurante = PromocaoController.request.RestauranteId;

                PromocaoController.promocaoDao.create(PromocaoController.request.body, PromocaoController.helper.responseWithText);
            });
        });
    }
    PostActualizarImagem() {
        PromocaoController.helper.verifyParams(function () {
            PromocaoController.helper.verifyFile('imagem','promocao',function () {
                PromocaoController.request.body.idRestaurante = PromocaoController.request.RestauranteId;
                PromocaoController.request.body.id = PromocaoController.request.params.id;
                PromocaoController.promocaoDao.update(PromocaoController.request.body, PromocaoController.helper.responseWithText);
            });
        });
    }
    GetPromocao() {
        PromocaoController.helper.verifyParams(function () {
            PromocaoController.request.params.idRestaurante = PromocaoController.request.RestauranteId;
            PromocaoController.promocaoDao.read(PromocaoController.request.params, PromocaoController.helper.responseWithJson);
        });
    }
    PutActualizar() {
        //PromocaoController.request.params.id;
        PromocaoController.helper.verifyParams(function () {
            PromocaoController.request.body.idRestaurante = PromocaoController.request.RestauranteId;
            PromocaoController.request.body.id = PromocaoController.request.params.id;
            if (PromocaoController.request.body.imagem !== undefined) {
                PromocaoController.request.body.imagem = undefined;
            }
            PromocaoController.promocaoDao.update(PromocaoController.request.body, PromocaoController.helper.responseWithText);
        });
    }
    DeletePromocao() {
        PromocaoController.helper.verifyParams(function () {
            PromocaoController.request.params.idRestaurante = PromocaoController.request.RestauranteId;
            PromocaoController.promocaoDao.delete(PromocaoController.request.params, PromocaoController.helper.responseWithText);
        });
    }

}

module.exports = PromocaoController;