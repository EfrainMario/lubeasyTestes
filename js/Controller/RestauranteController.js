import {Servidor} from "./../Model/Servidor.js";
import {validarTipoDeImagem, jsonReplacer} from "./GeralHelper.js";


class RestauranteController {
    constructor() {
        this.servidor = new Servidor();
    }

    login(dados){
        return new Servidor().requisitar('POST','/restaurantes/login', JSON.stringify(dados), function () {

        }, function(data, textStatus, xhr){

        }, function () {

        }, function () {

        });
    }
    obterDadosRestaurante(){
        return this.servidor.requisitar('GET','/restaurantes', null, function () {

        }, function (data, textStatus, xhr) {

        }, function () {

        }, function () {

        });
    }
    actualizarRestaurante(restaurante) {
        let dados = {};
        dados = Object.assign(dados, restaurante);
        dados.id = undefined;
        return this.servidor.requisitar('PUT', '/restaurantes', JSON.stringify(dados, jsonReplacer), function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }
    actualizarLogotipo(frmDataImagem){
        return this.servidor.requisitar('POST',`/restaurantes/actualizarimagem` , frmDataImagem, function () {

        }, function () {

        }, function () {

        }, function () {

        }, /*comFoto*/ true);
    }
    /*
    obterAvaliacaoMediaLoja(loja){
        return this.servidor.requisitar('GET','/lojas/'+loja.id+'/avaliacoes', null, function () {

        }, function () {

        }, function () {

        }, function () {

        });
    }
    criarLoja(loja){
        let dados = JSON.stringify(loja, jsonReplacer);
        this.servidor.requisitar('POST','/lojas', dados, function () {

        }, function () {

        }, function () {

        });
    }
    actualizarLogo(loja, foto){
        return this.servidor.requisitar('POST','/lojas/'+loja.id+'/logos', foto, function () {

        }, function () {

        }, function () {

        }, function () {

        }, true)
    }
    actualizarLoja(loja){
        let dados = {};
        dados = Object.assign(dados,loja);
        dados.id = undefined;
        return this.servidor.requisitar('PUT','/lojas/'+loja.id, JSON.stringify(dados, jsonReplacer), function () {

        }, function () {


        }, function () {
            M.toast({html: 'Erro. Por favor, tente mais tarde. ', classes: 'rounded'});


        }, function () {

        });
    }*/
}
export {RestauranteController};
