
var express = require('express');
var router = express.Router();
global.tokenPrivateKey = 'My token private Key ';



router.use( function (request, response, next) {
    if (request.path !== '/login' && request.path !== '/criarconta' && request.path !== '/confirm-account' && request.method.toUpperCase() !== 'OPTIONS'){
        console.log('not login');


        require('jsonwebtoken').verify(request.get('x-access-token'), tokenPrivateKey, function(err, decoded) {
            if(!err){
                request.RestauranteId = decoded.id;
                next();
            }else{
                response.status(401).send('Not Autorized');
            }
        });
    }else{
        console.log('login, criarConta');
        next();
    }

});

router.use('/', require('./router/RestauranteRouter'));
router.use('/', require('./router/PedidoRouter'));
router.use('/', require('./router/NotificacaoRouter'));
router.use('/', require('./router/ProdutoRouter'));
router.use('/', require('./router/PromocaoRouter'));
router.use('/', require('./router/AvaliacaoRestauranteRouter'));
router.use('/', require('./router/AvaliacaoProdutoRouter'));
router.use('/', require('./router/FCMRouter'));



module.exports = router;
