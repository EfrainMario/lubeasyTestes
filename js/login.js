import {Servidor} from './Model/Servidor.js';

window.name= "lubeasy";

$(document).ready(function(){


});
function login(dados){
    return new Servidor().requisitar('POST','/restaurantes/login', dados, function () {

    }, function(data, textStatus, xhr){

    }, function () {

    }, function () {

    });
}

function nextPage() {
    let params = new URLSearchParams(document.location.search.substring(1));
    let pagina = params.get("nextpage");
    location.replace(`index.php${pagina===null?'':`?action=${pagina}`}`);

}
    $('form#frmLogin').submit(function (e) {
        e.preventDefault();
        $(e.target).find('button[type=submit]').attr('disabled', true);
        $('div#loginPB').removeClass('mdc-linear-progress--closed');
        login(JSON.stringify(
            {
                email:$('input#email').val(),
                senha:$('input#senha').val()
            }))
            .done(function (data) {
                sessionStorage.token = data.token;
                nextPage();
            })
            .fail(function () {
                const a = new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar'));
                a.open();
            })
            .always(function () {
                $('div#loginPB').addClass('mdc-linear-progress--closed');
                $(e.target).find('button[type=submit]').attr('disabled', false);
            });

    });
