class FCMController{

    sendNotificationToCliente(req, res){

        const clienteDao = require("../model/ClienteDao");

        clienteDao.getClienteFCMTokenByIdCliente(req.params.idCliente, function (err, result, fields) {
            console.log(req.body);
            if (result[0].fcmToken){

                req.body.to = result[0].fcmToken;

                FCMController.verifyBodyRequest(req, function (isCorrect) {

                    if (isCorrect){
                        FCMController.sendNotification( req.body, res );
                    } else{
                        res.status(400).send({origin: '3', code: 'ER_BODY_REQUEST'});
                    }

                });

            } else{
                if (err) res.status(500).send({origin: '0', code: err.code}); else res.status(404).send({origin: '0', code: 'ER_ID_NOT_EXIST'});
            }

        });

    }

    sendNotificationToRestaurante(req, res){

        const restauranteDao = require("../model/RestauranteDao");

        restauranteDao.getRestauranteFCMTokenByIdRestaurante(req.params.idRestaurante, function (err, result, fields) {

            if (result[0].fcmToken){

                req.body.to = result[0].fcmToken;

                FCMController.verifyBodyRequest(req, function (isCorrect) {

                    if (isCorrect){
                        FCMController.sendNotification( req.body, res );
                    } else{
                        res.status(400).send({origin: '3', code: 'ER_BODY_REQUEST'});
                    }

                });

            } else{
                if (err) res.status(500).send({origin: '0', code: err.code}); else res.status(404).send({origin: '0', code: 'ER_ID_NOT_EXIST'});
            }

        });

    }


    static sendNotification(message, res, cb){

        const request = require('request');
        
        const url = 'https://fcm.googleapis.com/fcm/send';
        const server_key = "AAAAMKTl_9s:APA91bFfyeCaueeMNZn9eVVPBK1LVDoIUBhrhG8HMPzEcruiCEfhqt0KKFFzx9kDhhRP2aX4z29LfAaV1xoe3VhFzrFtiDylwYhczrIoPMP0HYNvBBFQXbPbOsTtbHg-ikoE31koLqwN";

        const options = {
            url: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key=' + server_key
            },
            json : message
        };

        function callback(error, response, body) {
            
            if (!error){

                console.log(body);

                if (cb){
                    cb(error, response, body);
                } else{

                    if (body.success >= 1 && response.statusCode === 200) {
                        res.sendStatus(response.statusCode);
                    }else if( body.failure >= 1 ){
                        res.status(500).send({origin: '1', code: 'ER_FCM_FAILURE'});
                    }else{
                        res.status(response.statusCode).send({origin: '1', code: 'ER_'});
                    }

                }

            } else{
                console.log("Error FCM: ", error);
                if (cb) cb(error, response, body); else res.status(500).send({origin: '1', code: error.code});
            }

        }

        request(options, callback);
    }

    static verifyBodyRequest(req, callback){

        try {
            if (req.body.notification && req.body.notification.title && req.body.notification.body  && req.body.to) callback(true); else callback(false);
        }catch (e) {
            callback(false);
        }

    }


}

module.exports = new FCMController();
