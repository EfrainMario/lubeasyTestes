class PedidoDao{

    constructor(){
        this.database = require('../config/DatabaseConfig');
    }


    read(pedido, callback){
        let finalQuery;

        finalQuery = pedido.id !== undefined ? `id = ${Number(pedido.id)} AND idRestaurante = ${pedido.idRestaurante}`
            : `idRestaurante = ${pedido.idRestaurante}`;
        this.database.query(`SELECT * FROM pedido WHERE ${finalQuery} ORDER BY pedido.id DESC`, [], callback);

        //Todo Join
        /*let finalQuery;

        finalQuery = pedido.id !== undefined ? `pedido.id = ${Number(pedido.id)} AND pedido.idRestaurante = ${pedido.idRestaurante}`
            : `pedido.idRestaurante = ${pedido.idRestaurante}`;

        this.database.query(
            //LEFT OUTER
            {

                sql:`SELECT * FROM pedido INNER JOIN estadopedido ON pedido.id = estadopedido.idPedido WHERE ${finalQuery} ORDER BY pedido.id DESC`,
                nestTables: true
            }, [], callback);*/
    }
    readOne(pedido, callback){
        let finalQuery;

        finalQuery = `pedido.id = ${Number(pedido.id)} AND pedido.idRestaurante = ${pedido.idRestaurante}`;


        this.database.query(
            //LEFT OUTER
            {
                sql:`SELECT pedido.*, lugarcliente.*, cliente.id, cliente.nome, cliente.telefone FROM pedido LEFT OUTER JOIN lugarcliente ON pedido.idLugarCliente = lugarcliente.id 
                    INNER JOIN cliente ON pedido.idCliente = cliente.id WHERE ${finalQuery}`,
                nestTables: true
            }, [], callback);
    }

    readList(pedido, callback) {
        let finalQuery;

        if (pedido.dataDeEmissao !== undefined) {
            finalQuery = `pedido.dataDeEmissao >= '${pedido.dataDeEmissao}' AND pedido.idRestaurante = ${pedido.idRestaurante}`;
        } else {
            finalQuery = `pedido.idRestaurante = ${pedido.idRestaurante}`;
        }
        //this.database.query(`SELECT * FROM pedido WHERE ${finalQuery} ORDER BY pedido.id DESC`, [], callback);

        this.database.query(
            {//LEFT OUTER JOIN
                sql:`SELECT pedido.id,pedido.codPedido,pedido.dataDeEmissao, pedido.isAccept,pedido.isDoneSuccessfully, cliente.id, cliente.nome FROM pedido 
                INNER JOIN cliente ON pedido.idCliente = cliente.id WHERE ${finalQuery} ORDER BY pedido.id DESC`,
                nestTables: true
            }, [], callback);
    }
    readPesquisarPorNome(dados, callback) {
        let splited = dados.nome.split('-');
        let idCliente;
        let idPedido;
        let finalQuery;

        if(splited.length>1){
            idCliente = splited[0];
            idPedido = splited[1];

            finalQuery = `(pedido.idCliente LIKE '${idCliente}%' AND pedido.id LIKE '${idPedido}%') AND pedido.idRestaurante = ${dados.idRestaurante}`;
        }else{
            finalQuery = `(pedido.idCliente LIKE '${dados.nome}%' OR cliente.nome LIKE '${dados.nome}%') AND pedido.idRestaurante = ${dados.idRestaurante}`;
        }

        //this.database.query(`SELECT * FROM pedido WHERE ${finalQuery} ORDER BY pedido.id DESC`, [], callback);
        this.database.query(
            {//LEFT OUTER JOIN
                sql:`SELECT pedido.id,pedido.codPedido,pedido.dataDeEmissao, pedido.isAccept,pedido.isDoneSuccessfully, cliente.id, cliente.nome FROM pedido 
                INNER JOIN cliente ON pedido.idCliente = cliente.id WHERE ${finalQuery} ORDER BY pedido.id DESC`,
                nestTables: true
            }, [], callback);
    }

    update(pedido, callback){
        let finalQuery =  `id = ${Number(pedido.id)} AND idRestaurante = ${pedido.idRestaurante}`;

        pedido.criacao !== undefined ? delete pedido.criacao : pedido;
        pedido.idRestaurante !== undefined ? delete pedido.idRestaurante : pedido;
        pedido.id !== undefined ? delete pedido.id : pedido;
        pedido.idCliente !== undefined ? delete pedido.idCliente : pedido;
        pedido.subTotal !== undefined ? delete pedido.subTotal : pedido;
        pedido.total !== undefined ? delete pedido.total : pedido;
        pedido.itensDoPedido !== undefined ? delete pedido.itensDoPedido : pedido;
        pedido.tempoDeEntrega !== undefined ? delete pedido.tempoDeEntrega : pedido;
        pedido.formaDePagamento !== undefined ? delete pedido.formaDePagamento : pedido;
        pedido.typePedido !== undefined ? delete pedido.typePedido : pedido;
        pedido.deliveryTime !== undefined ? delete pedido.deliveryTime : pedido;
        pedido.clienteTime !== undefined ? delete pedido.clienteTime : pedido;
        pedido.desconto !== undefined ? delete pedido.desconto : pedido;
        pedido.idLugarCliente !== undefined ? delete pedido.idLugarCliente : pedido;
        pedido.codPedido !== undefined ? delete pedido.codPedido : pedido;
        pedido.dataDeEmissao !== undefined ? delete pedido.dataDeEmissao : pedido;
        pedido.isPay !== undefined ? delete pedido.isPay : pedido;
        pedido.payTime !== undefined ? delete pedido.payTime : pedido;
        pedido.wasOpenForLoja !== undefined ? delete pedido.wasOpenForLoja : pedido;

        this.database.query(`UPDATE pedido SET ? WHERE  ${finalQuery}`, [pedido], callback);
    }
    createEstadoPedido(pedido, callback){


        this.database.query("INSERT INTO produto SET ? ", pedido, callback);
    }

}
module.exports = new PedidoDao();