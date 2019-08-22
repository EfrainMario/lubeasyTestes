
class Helper{
    static request;
    static response;
    constructor(req, res){
        Helper.request = req;
        Helper.response = res;
    }
    responseWithText(err, result) {
        console.log('err',err,'result',result);
        if (!err){
            if (result.affectedRows>0){
                Helper.response.status(201).send();
            } else{
                Helper.response.status(400).send("Recurso não Criado. Verifique os campos. hhh");
            }

        } else{
            console.log("Error: ", err);
            Helper.response.status(500).send("Algum erro estranho aconteceu...");
        }
    }
    responseWithHTML(err, result) {
        console.log('err',err,'result',result);
        if (!err){
            if (result.affectedRows>0){
                Helper.response.status(201).send(`<h3>Conta Confirmada</h3><p><a href="${website}">Clique aqui</a> para começar com as suas actividades</p>`);
            } else{
                Helper.response.status(400).send("Recurso não Criado. Verifique os campos. hhh");
            }

        } else{
            console.log("Error: ", err);
            Helper.response.status(500).send("Algum erro estranho aconteceu...");
        }
    }
    responseWithJson(err, result){
        {
            if (!err){
                if (result.length > 0 ){
                   Helper.response.status(200).json(result);
                }else if (result.length === 0){
                    Helper.response.status(204).send();
                }else{
                   Helper.response.status(400).send("Dados Errados.");
                }

            } else{
                console.log("Error: ", err);
                Helper.response.status(500).send("Algum erro estranho aconteceu...");
            }
        }
    }
    responseWithToken(err, result){
        {
            if (!err){

                if (result.length){
                    //Todo tempo de expiracao
                    require('jsonwebtoken').sign({id:result[0].id}, tokenPrivateKey, {},
                        function(jwtErr, token) {
                            if(jwtErr){
                                return Helper.response.status(400).send('Erro ao gerar chaves. Tente novamente');
                            }
                            return Helper.response.status(200).json({auth:true, token:token});
                        });
                } else{
                    Helper.response.status(400).send("Dados Errados.");
                }

            } else{
                console.log("Error: ", err);
                Helper.response.status(500).send("Algum erro estranho aconteceu...");
            }
        }
    }
    sendConfirmAccountEmail(restauranteExiste){
        {
            if (!restauranteExiste){
                require('jsonwebtoken').sign({restaurante:Helper.request.body}, tokenPrivateKey, { expiresIn: '1h' },
                    function(jwtErr, token) {
                        if(jwtErr){
                            return Helper.response.status(400).send('Erro ao gerar chaves. Tente novamente');
                        }
                        console.log(`${HOST}/v1/restaurantes/confirm-account?x_access_token=${token}`);
                        const subject = "Confirma a sua conta restaurante no Lubeasy";
                        const text = "";
                        const html = `${Helper.request.body.nome}.<br>Obrigado por te teres cadastrado no Lubeasy.<br/>A tua conta foi criada com sucesso.` +
                            `<br>Para activá-la deve clicar no link abaixo:<br>${HOST}/v1/restaurantes/confirm-account?x_access_token=${token}. O link expira em uma hora` +
                            `<br><br>Obrigado.`;
                        const callbackEmail = (err, response) => {
                            if (err) {
                                console.log(err);
                                res.status(500).send({origin: '4', code: 'ER_EMAIL'});
                            } else {
                                res.status(200).send("Os seus dados foram enviados com sucesso. Por favor verifique o seu email para continuar o seu cadastro. Obrigado.");
                                console.log(JSON.stringify(response));
                            }
                        };

                        require('./../util/Util').sendEmail(  "malaferneque16@gmail.com", [Helper.request.body.email], subject, text, html, callbackEmail);
                        return Helper.response.status(200).json({auth:true, token:token});
                    });

            } else{
                console.log("Error: ", restauranteExiste);
                Helper.response.status(500).send("Algum erro estranho aconteceu...");
            }
        }
    }
    verifyBody(callback){
        if (Helper.request.body) {
            callback();
        } else {
            Helper.response.status(400).send("Problema nos campos");
            return;
        }
    }
    verifyFile(campo, entidade,callback){
        let entidades ={
            produto:{
              width:  400
            },
            promocao:{
                width:  400
            },
            restaurante:{
                width: 150
            }
        };
        let i = 0;

        if (Helper.request.files!=null) {
            if(Helper.request.files[campo]!=null){
                //Pegar a extensão
                let extensao = Helper.request.files[campo].name.substring(Helper.request.files[campo].name.length - 4, Helper.request.files[campo].name.length);
                //Nome do ficheiro
                let nome = `img_${this.PHPdateTime('s-i-h_d-m-Y')}_${i}${extensao}`;
                //PASTAS
                let pastaRelativo = `img/${entidade}/`;
                let pastaCompleto = `${__dirname}/../../${pastaRelativo}`;

                verifyIfFlieExists(callback);

                function verifyIfFlieExists(callback){
                    let fs = require('fs');
                    fs.access(`${pastaCompleto}${nome}`, fs.constants.F_OK, (err) => {
                        if (err){
                            Helper.request.files[campo].mv(`${pastaCompleto}${nome}`, function (err) {
                                if (err) {
                                    Helper.response.status(500).send("Problema no Servidor 1");
                                    return 0;
                                }
                                //Todo Usar o Sharp
                                let sharp = require('sharp');
                                sharp(`${pastaCompleto}${nome}`)
                                    .resize({width: entidades[entidade].width})
                                    .toFile(`${pastaCompleto}../${nome}`, (err) => {
                                        if (err) {
                                            Helper.response.status(500).send("Problema no Servidor 2");
                                            return 0;
                                        }
                                        fs.rename(`${pastaCompleto}../${nome}`, `${pastaCompleto}${nome}`, (erro) => {
                                            if (erro) {
                                                Helper.response.status(500).send("Problema no Servidor 3");
                                                return 0;
                                            }else{
                                                //Todo Sucesso
                                                if(Helper.request.body.JSON) {
                                                    Helper.request.body = JSON.parse(Helper.request.body.JSON);
                                                }
                                                Helper.request.body[campo] = `${HOST}/restaurante/${pastaRelativo}${nome}`;
                                                callback();
                                                return 0;
                                            }

                                        });

                                    });
                                //Todo Usar o Sharp
                            });

                        } else {
                            nome = `img_${new Helper().PHPdateTime('s-i-h_d-m-Y')}_${i}${extensao}`;
                            i++;
                            verifyIfFlieExists(callback);
                            return 0;
                        }
                    });
                }
            } else {
                Helper.response.status(400).send("Problema nos campos");
                return 0;
            }
        } else {
            Helper.response.status(400).send("Problema nos campos");
            return 0;
        }




    }

    verifyRestauranteBody(callback){
        if(Helper.request.body.email && Helper.request.body.nome && Helper.request.body.categoria &&
            Helper.request.body.telefone && Helper.request.body.endereco &&
            Helper.request.body.municipio && Helper.request.body.provincia &&
            Helper.request.body.horario && Helper.request.body.taxaDeEntrega){

            callback();
        }else{
            Helper.response.status(400).send("Problema nos campos");
        }
    }

    verifyParams(callback){
        if (Helper.request.params){
            callback();
        } else{
            Helper.response.status(409).send(/*"Email ou número de telefone já usado para criar uma conta."*/);
        }
    }
    verifyRestauranteId(callback){
        if (Helper.request.RestauranteId){
            callback();
        } else{
            Helper.response.status(400).send("Problema nos campos");
        }
    }
    verifyLogin(callback){
        if (Helper.request.body.email && Helper.request.body.senha){
            callback();
        } else{
           Helper.response.status(400).send("Problema nos campos");
        }

    }

    PHPdateTime(DatePattern, dataHora = null) {
        let dateTime;
        if (dataHora !== null) {
            if (typeof dataHora === "string") {
                dateTime = new Date(dataHora);
            } else{
                dateTime = dataHora;
            }
        } else {
            dateTime = new Date();
        }
        for (var i = 0; i<=DatePattern.length; i++){
            if(DatePattern.charAt(i)==='d') DatePattern = DatePattern.replace(/d/gi, Number(dateTime.getDate())<10?'0'+(dateTime.getDate()):dateTime.getDate());
            if(DatePattern.charAt(i)==='m') DatePattern = DatePattern.replace(/m/gi, Number(dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):dateTime.getMonth()+1);
            if(DatePattern.charAt(i)==='Y') DatePattern = DatePattern.replace(/Y/gi, dateTime.getFullYear());
            if(DatePattern.charAt(i)==='i') DatePattern = DatePattern.replace(/i/gi, Number(dateTime.getMinutes())<10?'0'+(dateTime.getMinutes()):dateTime.getMinutes());
            if(DatePattern.charAt(i)==='h') DatePattern = DatePattern.replace(/h/gi, Number(dateTime.getHours())<10?'0'+(dateTime.getHours()):dateTime.getHours());
            if(DatePattern.charAt(i)==='s') DatePattern = DatePattern.replace(/s/gi, Number(dateTime.getSeconds())<10?'0'+(dateTime.getSeconds()):dateTime.getSeconds());
        }
        return DatePattern;
    }

    async uploadedImageToPath(callback, enty){
        /*const fs = require('fs');
        const IMAGEPATH = './../../img';
        fs.access(IMAGEPATH+'/'+ enty, fs.constants.F_OK, (err) => {
            if(err){
                return Helper.response.sendStatus(400);
            }
            fs.mkdir('./../img', (err) =>{
                if(err){
                    return Helper.response.sendStatus(400);
                }
            } );

        });*/
        

    }

}

module.exports = Helper;