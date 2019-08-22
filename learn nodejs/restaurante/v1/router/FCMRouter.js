const express = require('express');
const router = express.Router();


router.post('/send/notification/cliente/:idCliente', function (req, res) {
    const fcmController = require("./../controller/FCMController");
    fcmController.sendNotificationToCliente(req, res);

});

router.post('/send/notification/restaurante/:idRestaurante', function (req, res) {
    const fcmController = require("./../controller/FCMController");
    fcmController.sendNotificationToRestaurante(req, res);

});
router.post('/send/email/:idRestaurante', function (req, res) {
    const fcmController = require("./../controller/FCMController");
    fcmController.sendNotificationToRestaurante(req, res);

});


module.exports = router;