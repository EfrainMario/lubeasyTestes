import {Servidor} from "../Model/Servidor.js";
import {isAcceptToText} from "./GeralHelper.js";

class PedidosController{
    constructor(){
        this.servidor = new Servidor();
    }
    //requisitar(metodo, router, dados, loading, success, failure, sempre){
    obterPedidosForListHoje(){

        return this.servidor.requisitar('GET','/restaurantes/pedidos/list/hoje', null, function () {

        }, function(pedidos, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }
    obterPedidosForList(){
        return this.servidor.requisitar('GET','/restaurantes/pedidos/list', null, function () {

        }, function(pedidos, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }
    obterPedidoForDetail(id){
        return this.servidor.requisitar('GET',`/restaurantes/pedidos/${id}`, null, function () {

        }, function(pedidos, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }
    actualizarPedido(pedido){
        let id = pedido.id;
        delete pedido.id;
        return this.servidor.requisitar('PUT',`/restaurantes/pedidos/${id}`, JSON.stringify(pedido), function () {

        }, function(pedidos, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }
    pushMessageTo(to, payload){
        return this.servidor.requisitar('POST',`/restaurantes/send/notification/cliente/${to}`,JSON.stringify(payload), function () {

        }, function(pedidos, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }

    pesquisarPorNome(nome) {
        return this.servidor.requisitar('GET',`/restaurantes/pedidos/pesquisar/nomecliente/${nome}`,null, function () {

        }, function(pedidos, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }
    /*actualizarPedido(loja, pedido){
        let ped = Object.assign({},pedido);
        delete pedido.id;
        return this.servidor.requisitar('PUT','/lojas/'+loja.id+'/pedidos/'+ped.id, JSON.stringify(pedido), function () {

        }, function () {

        }, function () {
            M.toast({html: 'Erro na operação! Verifique a sua conexão', classes: 'rounded'});
        }, function () {

        });
    }

    obterUmPedidoDaLoja(loja, pedido){
        return this.servidor.requisitar('GET','/lojas/'+loja.id+'/pedidos/'+pedido.id, null, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }
    */
    //JSON: idPedido, estadoPedido e data[hora]

    /* Estados: 1--> aceite
                6--> com o Delivery

     */
    /*
    mudarEstadoPedido(loja, estadoPedido){
        this.servidor.requisitar('POST','/lojas/'+loja.id+'/pedidos/'+estadoPedido.idPedido, estadoPedido, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }
    clientePedidoPushMessage(loja, payload){
        return this.servidor.requisitar('POST','/pushmessage/clientes/'+loja.id, JSON.stringify(payload), function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }
*/


}
export {PedidosController}