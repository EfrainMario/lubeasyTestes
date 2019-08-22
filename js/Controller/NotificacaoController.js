import {Servidor} from "../Model/Servidor.js";
import {isAcceptToText} from "./GeralHelper.js";

class NotificacoesController{
    constructor(){
        this.servidor = new Servidor();
    }
    //requisitar(metodo, router, dados, loading, success, failure, sempre){
    obterNotificacoesForList(){
        return this.servidor.requisitar('GET','/restaurantes/notificacoes/list', null, function () {

        }, function(notificacoes, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }
    obterNotificacaoForDetail(id){
        return this.servidor.requisitar('GET',`/restaurantes/notificacoes/${id}`, null, function () {

        }, function(notificacoes, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }
    pesquisarPorNome(nome) {
        return this.servidor.requisitar('GET',`/restaurantes/notificacoes/pesquisar/nomecliente/${nome}`,null, function () {

        }, function(notificacoes, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }

}
export {NotificacoesController}