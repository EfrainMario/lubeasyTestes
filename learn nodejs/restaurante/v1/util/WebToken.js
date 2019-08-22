

class WebToken{
    static request;
    static response;
    constructor(request, response){
        WebToken.request = request;
        WebToken.response = response;
        this.jwt = require('jsonwebtoken');
        this.tokenPrivateKey = 'jhg7tyu12123yhe1289-qbdui2y78ejksd';
    }
    //payload { email: askjd, senha: amsdasdh}
    generateToken(payload, next){
        this.jwt.sign(payload, this.tokenPrivateKey, {algorithm: 'RS256'}, function(err, token) {
            if(err){
               return WebToken.response.status(400).send('Erro ao gerar chaves');
            }
            WebToken.response.status(200).send({auth:true, token:token});
        });
    }
    //     auth-scheme    = token
    authenticateToken(next){
        this.jwt.verify(WebToken.request.get('x-access-token'), this.tokenPrivateKey, function(err, decoded) {
            if(err){
                WebToken.response.status(401);
            }else{
                WebToken.request.params.id = decoded.id;
            }


        });
    }

}
module.exports = WebToken;