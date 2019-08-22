import {Servidor} from "./../Model/Servidor.js";

class ProdutoController{
    constructor(){
        this.servidor = new Servidor();
    }
    //requisitar(metodo, router, dados, loading, success, failure, sempre)
    obterProdutosDoRestaurante(id=''){
        //(xhr.status === 204)
        return this.servidor.requisitar('GET','/restaurantes/produtos/'+id, null, function () {
            //Before
        }, function(data, textStatus, xhr){
            //success

        }, function () {
            //erro
        }, function () {
            //sempre
        });
    }
    actualizarProduto(produto){
        let id = produto.id;
        delete produto.id;
        return this.servidor.requisitar('PUT',`/restaurantes/produtos/${id}`, JSON.stringify(produto), function () {
            //Before
        }, function(data, textStatus, xhr){
            //success

        }, function () {
            //erro
        }, function () {
            //sempre
        });
    }
    actualizarImagemProduto(produto,frmDataImagem){
        return this.servidor.requisitar('POST',`/restaurantes/produtos/${produto.id}/actualizarimagem` , frmDataImagem, function () {

        }, function () {

        }, function () {

        }, function () {

        }, /*comFoto*/ true);
    }
    apagarProdutoDoRestaurante(id){
        return this.servidor.requisitar('DELETE','/restaurantes/produtos/'+id, null, function () {
            //Before
        }, function(data, textStatus, xhr){
            //success

        }, function () {
            //erro
        }, function () {
            //sempre
        });
    }
    criarProduto(produto){
        return this.servidor.requisitar('POST','/restaurantes/produtos',produto, function () {

        }, function (data, textStatus, xhr) {

        }, function () {

        }, function () {

        }, /*comFoto*/ true);
    }
}
export {ProdutoController}