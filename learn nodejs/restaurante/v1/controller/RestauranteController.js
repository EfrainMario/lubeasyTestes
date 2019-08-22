class RestauranteController {
    static request;
    static restauranteDao;
    static helper;
    //response;
    constructor(req, res) {
        let HelperClass = require('../util/GeralHelper');
        RestauranteController.helper = new HelperClass(req, res);
        RestauranteController.request = req;
        RestauranteController.restauranteDao = require('../model/RestauranteDao');
        //this.response = res;
    }

    PostCriarConta() {
        RestauranteController.helper.verifyRestauranteBody(function () {
            RestauranteController.restauranteDao.AccountExists(RestauranteController.request.body, RestauranteController.helper.sendConfirmAccountEmail);
        });
    }

    PostInsertData() {
        RestauranteController.helper.verifyRestauranteBody(function () {
            RestauranteController.request.body.dataDeCriacao = RestauranteController.helper.PHPdateTime('Y-m-d h:i:s');
            RestauranteController.restauranteDao.create(RestauranteController.request.body, RestauranteController.helper.responseWithHTML);
        });
    }


    GetData() {
        RestauranteController.helper.verifyRestauranteId(function () {
            RestauranteController.restauranteDao.read({id: RestauranteController.request.RestauranteId}, RestauranteController.helper.responseWithJson);
        });
    }
    PostLogin() {
        RestauranteController.helper.verifyLogin(function () {
            RestauranteController.restauranteDao.login(RestauranteController.request.body, RestauranteController.helper.responseWithToken);
        });
    }
    PutActualizar() {
        RestauranteController.helper.verifyRestauranteId(function () {
            RestauranteController.request.body.id = RestauranteController.request.RestauranteId;
            if (RestauranteController.request.body.logotipo !== undefined) {
                RestauranteController.request.body.logotipo = undefined;
            }
            RestauranteController.restauranteDao.update(RestauranteController.request.body, RestauranteController.helper.responseWithText);
        });
    }
    PostActualizarImagem() {
        RestauranteController.helper.verifyRestauranteId(function () {
            RestauranteController.helper.verifyFile('logotipo','restaurante', function () {
                RestauranteController.request.body.id = RestauranteController.request.RestauranteId;
                RestauranteController.restauranteDao.update(RestauranteController.request.body, RestauranteController.helper.responseWithText);
            })
        });
    }

}

module.exports = RestauranteController;