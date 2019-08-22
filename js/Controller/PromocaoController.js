import {Servidor} from "./../Model/Servidor.js";

class PromocaoController{
    constructor(){
        this.servidor = new Servidor();
    }
    //requisitar(metodo, router, dados, loading, success, failure, sempre)
    obterPromocoesDoRestaurante(id=''){
        //(xhr.status === 204)
        return this.servidor.requisitar('GET','/restaurantes/promocoes/'+id, null, function () {
            //Before
        }, function(data, textStatus, xhr){
            //success

        }, function () {
            //erro
        }, function () {
            //sempre
        });
    }
    actualizarPromocao(promocao){
        let id = promocao.id;
        delete promocao.id;
        return this.servidor.requisitar('PUT',`/restaurantes/promocoes/${id}`, JSON.stringify(promocao), function () {
            //Before
        }, function(data, textStatus, xhr){
            //success

        }, function () {
            //erro
        }, function () {
            //sempre
        });
    }
    actualizarImagemPromocao(promocao,frmDataImagem){
        return this.servidor.requisitar('POST',`/restaurantes/promocoes/${promocao.id}/actualizarimagem` , frmDataImagem, function () {

        }, function () {

        }, function () {

        }, function () {

        }, /*comFoto*/ true);
    }
    apagarPromocaoDoRestaurante(id){
        return this.servidor.requisitar('DELETE','/restaurantes/promocoes/'+id, null, function () {
            //Before
        }, function(data, textStatus, xhr){
            //success

        }, function () {
            //erro
        }, function () {
            //sempre
        });
    }
    criarPromocao(promocao){
        return this.servidor.requisitar('POST','/restaurantes/promocoes',promocao, function () {

        }, function (data, textStatus, xhr) {

        }, function () {

        }, function () {

        }, /*comFoto*/ true);
    }
}
export {PromocaoController}