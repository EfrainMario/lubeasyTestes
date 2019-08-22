var express = require('express');
var app = express();
global.PORTA = 6001;
global.HOST = `http://localhost:${PORTA}`;
//global.website = `http://www.lubeasy.com`;
global.website = 'https://lubeasywebsite.herokuapp.com';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (request, response, next){
        response.set('Access-Control-Allow-Origin',website);
        response.set("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        response.set("Access-Control-Allow-Credentials", 'true');
        response.set("Access-Control-Max-Age", '86400');
        response.set("Access-Control-Allow-Headers", 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin, x-access-token');
        next();
});


/*app.use( function (request, response, next) {
    const jwt = require('jsonwebtoken');
    jwt.verify(request.get('x-access-token'), this.tokenPrivateKey, function(err, decoded) {
        if(err){
            response.status(401);
        }else{
            request.params.id = decoded.id;
            next();
        }
    });
});*/


app.use('/restaurante/img', express.static(`${__dirname}/Restaurante/img`,));
app.use('/v1/restaurantes', require('./restaurante/v1/index.js'));
/*app.listen({
    host: 'localhost',
    port: 80,
    exclusive: true
});*/
app.listen(PORTA);

