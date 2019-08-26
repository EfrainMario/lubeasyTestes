import {Servidor} from './Model/Servidor.js';


window.name= "lubeasy";

$(document).ready(function(){


});
function criarConta(dados){
    return new Servidor().requisitar('POST','/restaurantes/criarconta', dados, function () {

    }, function(data, textStatus, xhr){

    }, function () {

    }, function () {

    });
}


$('form#frmCriarConta').submit(function (e) {
    e.preventDefault();

    let senha = $('#senha').val();
    let confirmarSenha = $('#confirmarSenha').val();
    if(senha.length > 6){
        if(senha === confirmarSenha){
            $(e.target).find('button[type=submit]').attr('disabled', true);
            $('div#pbCriarConta').removeClass('mdc-linear-progress--closed');
            criarConta(JSON.stringify(
                {
                    nome: $('#nome').val(),
                    email: $('#email').val(),
                    localDeReferencia: $('#localDeReferencia').val(),
                    tipoDeRestaurante: $('#categoria').val(),
                    telefone: $('#telefone').val(),
                    endereco: $('#endereco').val(),
                    senha: senha,
                    municipio: $('#municipio').val(),
                    provincia: $('#provincia').val(),
                    horario: $('#horario').val(),
                    objectivo: $('#objectivo').val(),
                    typeService: $('#typeService').prop('checked'),
                    taxaDeEntrega: $('#taxaDeEntrega').val(),
                    payOnline: $('#payOnline').prop('checked'),
                    payMoney: $('#payMoney').prop('checked'),
                    payTPA: $('#payTPA').prop('checked')
                }))
                .done(function () {
                    location.replace(`contacriada.html`);
                })
                .fail(function (xhr, ts) {
                    if(xhr.status === 409){
                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Email ou número de telefone já usado para criar uma conta. Tente outros');
                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar')).open();
                    }
                    else{
                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Problemas ao criar conta. Verifique a ligação à internet');
                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar')).open();
                    }

                })
                .always(function () {
                    $('div#pbCriarConta').addClass('mdc-linear-progress--closed');
                    $(e.target).find('button[type=submit]').attr('disabled', false);
                });
        }
        else{
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Os campos "Senha" e "Confirmar senha" são diferentes');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar')).open();
        }
    }
    else{
        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('A senha deve ter mais de 6 caracteres');
        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar')).open();
    }



});
