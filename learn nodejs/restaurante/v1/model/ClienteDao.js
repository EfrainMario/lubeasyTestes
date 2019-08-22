class ClienteDao{

    constructor(){
        this.database = require('./../config/DatabaseConfig');
    }

    existCliente(emailCliente, tefeloneCliente, callback){
        this.database.query("SELECT id FROM cliente WHERE email = ? OR telefone = ?", [emailCliente, tefeloneCliente], function (err, result) {

            if (result.length === 0){
                callback(false);
            }else{
                callback(true);
            }

        });

    }

    getClienteFCMTokenByIdCliente(idCliente,callback){
        this.database.query("SELECT fcmToken FROM cliente WHERE id = 6",[idCliente], callback);
    }

    getClienteByIdCliente(idCliente,callback){
        this.database.query("SELECT * FROM cliente WHERE id = ?", [idCliente], callback);
    }

    getIdClienteByEmailYSenha(email, senha, callback){
        this.database.query("SELECT id, nome, email FROM cliente WHERE email = ? AND senha = ?", [email, senha], callback);
    }

    getLugaresCliente(idCliente, callback){
        this.database.query("SELECT * FROM lugarcliente WHERE idCliente = ?", [idCliente], callback);
    }

    getClientOrders(queryParams, callback){
        var offset = (queryParams.page-1)*queryParams.pageSize;

        const sql = "SELECT restaurante.nome AS nomeDoRestaurante, pedido.id, pedido.idCliente, pedido.idRestaurante, pedido.dataDeEmissao, pedido.tempoDeEntrega, pedido.isAccept, pedido.isPay, pedido.isDoneSuccessfully FROM pedido INNER JOIN restaurante ON pedido.idRestaurante = restaurante.id WHERE pedido.idCliente = "+queryParams.idCliente+" ORDER BY pedido.id DESC LIMIT "+offset+","+queryParams.pageSize;

        this.database.query(sql, callback);
    }

    getClientOrder(idPedido, callback){
        const sql = "SELECT restaurante.id AS idRestaurante, restaurante.nome AS nomeDoRestaurante, restaurante.latitude AS latitudeDoRestaurante, restaurante.longitude AS longitudeDoRestaurante, restaurante.endereco AS enderecoDoRestaurante, restaurante.localDeReferencia AS localDeReferenciaDoRestaurante, restaurante.taxaDeEntrega AS taxaDeEntregaDoRestaurante, restaurante.telefone AS telefoneDoRestaurante, pedido.id, pedido.idCliente, pedido.idEntregador, pedido.itensDoPedido, pedido.total, pedido.subTotal, pedido.observacoes, pedido.tempoDeEntrega, pedido.formaDePagamento, pedido.isAccept, pedido.isDoneSuccessfully, pedido.isNotAcceptDetail, pedido.typePedido, pedido.receptRestauranteTime, pedido.clienteTime, pedido.desconto, pedido.codPedido, pedido.dataDeEmissao, pedido.isPay, pedido.payTime, pedido.wasOpenForRestaurante, pedido.isCancelled FROM pedido INNER JOIN restaurante ON pedido.idRestaurante = restaurante.id WHERE pedido.id = ?";

        this.database.query(sql, [idPedido], callback);
    }

    postCliente(cliente, callback){
        this.database.query("INSERT INTO cliente SET ?", cliente, callback);
    }

    postLugarCliente(lugarCliente, callback){
        this.database.query("INSERT INTO lugarcliente SET ?", lugarCliente, callback);
    }

    postClientOrder(order, callback){
        this.database.query("INSERT INTO pedido SET ?", order, callback);
    }

    updateBasicInfoCliente(cliente, callback){
        this.database.query("UPDATE cliente SET nome = ?, senha = ?, telefone = ? WHERE id = ?", [cliente.nome, cliente.senha, cliente.telefone, cliente.idCliente], callback);
    }

    updateSettingsCliente(settings, callback){
        this.database.query("UPDATE cliente SET isSendPromocoes = ?, isSendStatusPedido = ?, isSendGeralApp = ?, isSendNewLoja = ? WHERE id = ?", [settings.isSendPromocoes, settings.isSendStatusPedido, settings.isSendGeralApp, settings.isSendNewLoja], callback);
    }

    updatefcmCliente(cliente, callback){
        this.database.query("UPDATE cliente SET fcmToken = ? WHERE id = ?", [cliente.fcmToken, cliente.id], callback);
    }

    lockCliente(idCliente, callback){
        this.database.query("UPDATE cliente SET isLock = 1 WHERE id = ?", [idCliente], callback);
    }

    unlockCliente(idCliente, callback){
        this.database.query("UPDATE cliente SET isLock = 0 WHERE id = ?", [idCliente], callback);
    }

    putLugarCliente(lugarCliente, callback){
        this.database.query("UPDATE lugarcliente SET nome = ?, endereco = ?, descricao = ?, latitude = ?, longitude = ? WHERE id = ?", [lugarCliente.nome, lugarCliente.endereco, lugarCliente.descricao, lugarCliente.latitude, lugarCliente.longitude, lugarCliente.id], callback);
    }

    deleteLugarCliente(idLugarCliente, callback){
        this.database.query("DELETE FROM lugarcliente WHERE id = ?", [idLugarCliente], callback);
    }

}

module.exports = new ClienteDao();
