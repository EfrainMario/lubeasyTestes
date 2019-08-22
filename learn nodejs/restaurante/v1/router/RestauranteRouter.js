var express = require('express');
var router = express.Router();




router.use(require('express-fileupload')());

router.route('/')
    .put(function (req, res) {
        const RestauranteClass = require("../controller/RestauranteController");
        new RestauranteClass(req, res).PutActualizar();
    })

    .get(function (req, res) {
        const RestauranteClass = require("../controller/RestauranteController");
        new RestauranteClass(req, res).GetData();
    });

router.post('/login',function (req, res) {
    const RestauranteClass = require("../controller/RestauranteController");
    new RestauranteClass(req, res).PostLogin();
});
router.post('/actualizarimagem',function (req, res) {
    const RestauranteClass = require("../controller/RestauranteController");
    new RestauranteClass(req, res).PostActualizarImagem();
});


router.post('/criarconta',function (req, res) {
    const RestauranteClass = require("../controller/RestauranteController");
    new RestauranteClass(req, res).PostCriarConta();
});
router.get('/confirm-account',function (req, res) {
    console.log(req.query.x_access_token);
    require('jsonwebtoken').verify(req.query.x_access_token, tokenPrivateKey, function(err, decoded) {
        if(!err){
            req.body = decoded.restaurante;
            const RestauranteClass = require("../controller/RestauranteController");
            new RestauranteClass(req, res).PostInsertData();
        }else{
            res.status(401).send('Not Autorized');
        }
    });
});


module.exports = router;