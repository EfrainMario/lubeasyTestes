import {RestauranteController} from "./Controller/RestauranteController.js";
import {ProdutoController} from "./Controller/ProdutoController.js";
import {simNao, validarTipoDeImagem, jsonReplacer, PHPdateTime, isAcceptToText} from "./Controller/GeralHelper.js";
import {PedidosController} from "./Controller/PedidoController.js";
import {PromocaoController} from "./Controller/PromocaoController.js";
import {NotificacoesController} from "./Controller/NotificacaoController.js";

var restauranteController = new RestauranteController();
var pedidosController = new PedidosController();
var notificacoesController = new NotificacoesController();
var produtoController = new ProdutoController();
var promocaoController = new PromocaoController();

var restaurante;

let refreshPedidosTimeoutID;
let Pages = {
    actualPage:null,
    errorPage:`<div id="erroPag">
                    <div class="mdc-layout-grid" style="height: 80vh !important;">
                        <div class="mdc-layout-grid__inner" style="height: calc(100% - 64px - 256px); margin-top: 100px;">
                            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2-tablet mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--align-middle"></div>
                            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--align-middle" style="text-align: center; color: grey;">
                                <i class="material-icons mdc-typography--headline3">internet_error</i>
                                <p>Erro na conexão</p>
                                <button id="btnRefresh" class="mdc-icon-button material-icons mdc-theme--on-primary">refresh</button>
                                <p class="mdc-typography--caption" style="color: grey;text-align: center;">Lubeasy &copy 2019</p>
                            </div>
                        </div>
                    </div>
                </div>`,
    showErrorPage(){
        this.actualPage = $('main#main-content').html();
        $('main#main-content').html(this.errorPage);
        this.initBtnRefresh();
    },
    initBtnRefresh(){
        $('button#btnRefresh').click(function (e) {
            e.preventDefault();
            $('div#pbIndex').removeClass('mdc-linear-progress--closed hide');
            $('main#main-content').hide();
            $('main#main-content').html(Pages.actualPage);
            ler();
        });
    },

    brevementePage: `<div id="erroPag">
                    <div class="mdc-layout-grid" style="height: 80vh !important;">
                        <div class="mdc-layout-grid__inner" style="height: calc(100% - 64px - 256px); margin-top: 100px;">
                            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-2-tablet mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--align-middle"></div>
                            <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-4-phone mdc-layout-grid__cell--align-middle" style="text-align: center; color: grey;">
                                <i class="material-icons mdc-typography--headline3">internet_error</i>
                                <p>Ainda estamos a trabalhar nesta página.</p>
                                <p class="mdc-typography--caption" style="color: grey;text-align: center;">Lubeasy &copy 2019</p>
                            </div>
                        </div>
                    </div>
                </div>`,
    showBrevementePage(){
        this.actualPage = $('main#main-content').html();
        $('main#main-content').html(this.brevementePage);
    },
    navigateToUrl(){
        let params = new URLSearchParams(document.location.search.substring(1));
        let pagina = params.get("action");

        if(pagina == null){

        }else if(pagina === "pag/entregadores" || pagina === "pag/estatisticas"){
            if(document.body.clientWidth<432){
                drawer.open = false;
            }
            $('main#main-content').html(Pages.showBrevementePage()).show();
        }else if(pagina === "sair"){
            dialogSair.open();
        }else {
            dialogInserirSenhaParaPaginas(pagina,
                function () {
                    $('div#pbIndex').removeClass('mdc-linear-progress--closed hide');
                    $('main#main-content').hide();

                    if(document.body.clientWidth<432){
                        drawer.open = false;
                    }
                    $('#main-content').load(pagina + '.html', function (data, ts, xhr) {
                        if(ts === 'error'){
                            $('main#main-content').html(Pages.showErrorPage());
                        }else{
                            ler();
                        }
                        $(this).show();
                        //Recuperar Foco
                        $('aside.mdc-drawer a.mdc-list-item--activated').removeClass('mdc-list-item--activated');
                        $(`aside.mdc-drawer a.mdc-list-item[href='${pagina}']`).addClass('mdc-list-item--activated');
                        $('div#pbIndex').addClass('mdc-linear-progress--closed hide');
                    });

                });

        }
    }

};

let dialogSair = new mdc.dialog.MDCDialog(document.getElementById('dialogSair'));


function initDrawer() {
    $('aside.mdc-drawer .mdc-drawer__header h3.mdc-drawer__title').text(restaurante.nome);
    $('aside.mdc-drawer .mdc-drawer__header h6.mdc-drawer__subtitle').text(restaurante.email);
    $('header #open_drawer').show();

}

$(document).ready(function(){
    $('body').show();
    responsivity();
    ler();


    window.onpopstate = function(event) {
        Pages.navigateToUrl();
    };
});

function INTENT(firstTime = false){
    let params = new URLSearchParams(document.location.search.substring(1));
    let pagina = params.get("action");

    if(pagina!==null){
        let $a = $(`aside.mdc-drawer a.mdc-list-item[href='${pagina}']`);
        if($a.length && firstTime){
            $a.trigger('click', [function () {
                $(`aside.mdc-drawer`).find('a.mdc-list-item--activated').removeClass('mdc-list-item--activated');
                $a.addClass('mdc-list-item--activated');
            }]);
        }else {
            $(`aside.mdc-drawer a.mdc-list-item[href='pag/inicial']`).trigger('click', [function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Pagina não encontrada');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            }]);
        }
    }else{
        $(`aside.mdc-drawer a.mdc-list-item[href='pag/inicial']`).trigger('click');
    }

}


// ------------------------- Index Page ------------------------------------ //
function responsivity() {
    let $drawer = $('aside.mdc-drawer');
    if(document.body.clientWidth<432){
        $drawer.removeClass('mdc-drawer--dismissible');
        $drawer.addClass('mdc-drawer--modal');
        $drawer.after('<div class="mdc-drawer-scrim"></div>');

    }else{
        $drawer.addClass('mdc-drawer--dismissible');

        $drawer.removeClass('mdc-drawer--modal');
        $('.mdc-drawer-scrim').remove();
    }
}

window.addEventListener('resize',responsivity);


let sw = new mdc.switchControl.MDCSwitch(document.querySelector('header.mdc-top-app-bar div.mdc-switch'));

$('header.mdc-top-app-bar div.mdc-switch input#online').click(function () {
    restauranteController.actualizarRestaurante({online: sw.checked})
       .done(function () {
           restaurante.online = sw.checked;
           $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Alterado');
           new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
       })
       .fail(function () {
            sw.checked = restaurante.online;
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Não guardado. Verifique a sua conexão com a internet');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
    });
});


$('form#frmSair').submit(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $(this).find('button[type=submit]').attr('disabled', true);
    $('div#pbSair').removeClass('mdc-linear-progress--closed');

    // Todo --->  Por a loja offline?
    restauranteController.actualizarRestaurante({online: false, fcmToken: null})
        .done(function () {
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Sessão terminada. A sair...');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            dialogSair.close();
            //Apaar o token
            delete sessionStorage.token;
            //console.log(sessionStorage.token);
            location.replace('login.html');
        })
        .fail(function () {
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao sair. Verifique a sua ligação à internet');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
        })
        .always(function () {
            $('div#pbSair').addClass('mdc-linear-progress--closed');
            $(e.target).find('button[type=submit]').attr('disabled', false);
        })

});

$('aside.mdc-drawer a.mdc-list-item, header#app-bar section a#novoPedido, header#app-bar section a#notificacoes').on('click', function (e, callback = function () {}) {

    e.preventDefault();


    let pagina = $(this).attr("href");
    if(pagina == null){

    }else if(pagina === "pag/entregadores" || pagina === "pag/estatisticas"){
        if(document.body.clientWidth<432){
            drawer.open = false;
        }
        $('main#main-content').html(Pages.showBrevementePage()).show();
    }else if(pagina === "sair"){
        dialogSair.open();
    }else {
        dialogInserirSenhaParaPaginas(pagina,
            function () {
                $('div#pbIndex').removeClass('mdc-linear-progress--closed hide');
                $('main#main-content').hide();

                if(document.body.clientWidth<432){
                    drawer.open = false;
                }
                $('#main-content').load(pagina + '.html', function (data, ts, xhr) {
                    if(ts === 'error'){
                        $('main#main-content').html(Pages.showErrorPage());
                    }else{
                        callback();
                        ler();
                        history.pushState(null, "Lubeasy-"+pagina, `?action=${pagina}`);

                    }
                    $(this).show();
                    $('div#pbIndex').addClass('mdc-linear-progress--closed hide');
                });

            });

    }

});


function dialogInserirSenhaParaPaginas(pagina, depoisExecutarFuncao) {
    let executarFuncao = depoisExecutarFuncao;
    let dialogSenha = new mdc.dialog.MDCDialog(document.querySelector('#dialogSenha'));
    dialogSenha.close();
    dialogSenha.listen('MDCDialog:closing', function() {
        //console.log('dialgo fechando');
        $('input#senhaInserida').val('');
        $('form#frmSenha').unbind('submit');
        executarFuncao = function () {};
    });
    dialogSenha.listen('MDCDialog:opening', function () {
        $('form#frmSenha').submit(function (e) {
            e.preventDefault();
            $('div#pbSenha').removeClass('mdc-linear-progress--closed');
            $(e.target).find('button[type=submit]').attr('disabled', true);
            new RestauranteController().login({senha: $(this).find('input#senhaInserida').val(), email: restaurante.email})
                .done(function () {
                    executarFuncao();
                    dialogSenha.close();
                }).fail(function (ts, xhr) {
                    //console.log(ts, xhr);
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Senha Errada.');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            }).always(function () {
                $(e.target).find('input#senhaInserida').val('');
                $('div#pbSenha').addClass('mdc-linear-progress--closed');
                $(e.target).find('button[type=submit]').attr('disabled', false);
            });
        });
    });

    if((pagina === 'pag/promocoes') || (pagina === 'pag/produtos') || (pagina === 'exibir' )) {
        dialogSenha.open();

    }else{
        executarFuncao();
    }

}

// ------------------------- Index Page ------------------------------------ //






//PhoneWidth = 432

//Paginas com e contentList ContentDetails

function ler(){

    if(restaurante == null)
    {
        //PRIMEIRA VEZ
        restauranteController.obterDadosRestaurante()
            .done(function (data) {
                restaurante = data[0];
                sw.checked = restaurante.online;
                initDrawer();
                INTENT(true);
                reader();
            })
            .fail(function(){
                Pages.showErrorPage();
                $('main#main-content').show();
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Problemas com a conexão. Verifique sua a ligação com a internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {
                $('div#pbIndex').addClass('mdc-linear-progress--closed hide');
            })

    }else{
        // ! PRIMEIRA VEZ

        //INTENT();
        reader();
    }

    function reader (){
        window.mdc.autoInit();
        if(refreshPedidosTimeoutID) window.clearTimeout(refreshPedidosTimeoutID);
        // ------------------------ main.html ----------------------------------- ///
        if($('div#inicialPag').length !== 0){
            $('div#inicialPag').show();
            paginaInicial();
            $('header .mdc-top-app-bar__title').text('Inicial');
        }
        // ------------------------ pedidos.html ----------------------------------- ///
        else if($('div#pedidosPag').length !== 0){
            $('div#pedidosPag').show();
            paginaPedidos();
            $('header .mdc-top-app-bar__title').text('Pedidos');
        }
        // ------------------------ promocao.html ----------------------------------- ///
        else if($('div#promocoesPag').length !== 0){
            $('div#promocoesPag').show();
            paginaPromocoes();
            $('header .mdc-top-app-bar__title').text('Promoções');
        }
        // ------------------------ definicoes.html ----------------------------------- ///
        else if($('div#definicoesPag').length !== 0){
            $('div#definicoesPag').show();
            paginaDefinicoes();
            $('header .mdc-top-app-bar__title').text('Definições');
        }
        // ------------------------ produtos.html ----------------------------------- ///
        else if($('div#produtosPag').length !== 0){
            $('div#produtosPag').show();
            paginaProdutos();
            $('header .mdc-top-app-bar__title').text('Produtos');
        }else if($('div#notificacoesPag').length !== 0){
            $('div#notificacoesPag').show();
            paginaNotificacoes();
            $('header .mdc-top-app-bar__title').text('Notificacoes');
        }else{
            console.log('Desconhecida');
        }
    }


}
// -------------------------   Inicial --------------------------------//
function paginaInicial() {

    initMain();

    function initMain() {
        $('span#nome').html(restaurante.nome);
        $('span#categoria').html(restaurante.categoria);
        $('span#telefone').html(restaurante.telefone);
        $('img#restauranteLogotipo').attr('src', restaurante.logotipo);

        $('span#endereco').html(restaurante.endereco);
        $('span#municipio').html(restaurante.municipio);
        $('span#provincia').html(restaurante.provincia);
        $('span#horario').html(restaurante.horario);

        sw.checked = restaurante.online;
        $('p#objectivo').html(restaurante.objectivo);

        $('span#typeService').html(simNao(restaurante.typeService));

        $('span#taxaDeEntregas').html(restaurante.taxaDeEntrega);

        $('span#payOnline').html(simNao(restaurante.payOnline));
        $('span#payMoney').html(simNao(restaurante.payMoney));
        $('span#payTPA').html(simNao(restaurante.payTPA));


        initDrawer();

        $('main#main-content').removeClass('hide');
    }

}

// ------------------------ Pedidos --------------------------  //
function paginaPedidos(){
    let dialogNegarPedido = new mdc.dialog.MDCDialog(document.getElementById('dialogNegarPedido'));
    let dialogEstaPronto = new mdc.dialog.MDCDialog(document.getElementById('dialogEstaPronto'));
    let dialogAceitarPedido = new mdc.dialog.MDCDialog(document.getElementById('dialogAceitarPedido'));



    // ---------------- Responsividade --------------------- //
    function responsivity() {
        let contentDetails = $('div#contentDetails');
        let contentList = $('div#contentList');
        if((document.body.clientWidth<432) && (contentDetails.length!==0) && (contentList.length !==0)){
            contentDetails.hide();
            $('div#contentList .mdc-list-group').addClass('semBordaDireita');
            constructEventsOnPhone();
        }else{
            destroyEventsOnPhone();
            $('div#contentList .mdc-list-group').removeClass('semBordaDireita');
            contentDetails.hide();

        }
    }

    function constructEventsOnPhone(){

        $('a#back_arrow').click(function (e) {
            e.preventDefault();
            $('div#contentDetails').fadeOut(function () {
                $('a#open_drawer').show();
                $('a#back_arrow').hide();
                $('div#contentList').fadeIn(function () {});
            });
        });

        $('div#contentList .mdc-list-group #pedidosLista .mdc-list-item.pedidoItem').on('click.responsivo',function () {
            $('div#contentList').fadeOut(function () {
                $('a#open_drawer').hide();
                $('a#back_arrow').show();
                /*$('div#contentDetails').fadeIn(function () {
                });*/
            });
        });
    }
    function destroyEventsOnPhone() {
        //$('a#back_arrow').click(function () {});
        $('div#contentList .mdc-list-group #pedidosLista .mdc-list-item.pedidoItem').off('click.responsivo');

    }

    responsivity();
    window.addEventListener('resize',responsivity);
    // ---------------- Responsividade --------------------- //


    $('button#verPedidosAnteriores').on('click.vermais', function (e) {
        e.preventDefault();
        pedidosController.obterPedidosForList()
            .done(function (data, textStatus,xhr) {
                $('button#verPedidosAnteriores').hide();
                $('button#verPedidosDeHoje').show();
                if(xhr.status === 204){
                    $('ul#pedidosLista').html('<div class="mdc-typography--caption">Sem Pedidos por enquanto. Os pedidos surgem ao longo do dia. Fique atento</div>');
                }else{
                    $('ul#pedidosLista').html(buildListPedidosFromArray(data, false));
                    initNonDOMelements();
                }
            })
            .fail(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao obter pedidos os. Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {

            })

    });
    $('button#verPedidosDeHoje').on('click.vermenos', function (e) {
        e.preventDefault();
        pedidosController.obterPedidosForListHoje()
            .done(function (data, textStatus,xhr) {
                $('button#verPedidosAnteriores').show();
                $('button#verPedidosDeHoje').hide();
                if(xhr.status === 204){
                    $('ul#pedidosLista').html('<div class="mdc-typography--caption">Sem Pedidos por enquanto. Os pedidos surgem ao longo do dia. Fique atento</div>');
                }else{
                    $('ul#pedidosLista').html(buildListPedidosFromArray(data, false));
                    initNonDOMelements();
                }
            })
            .fail(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao obter pedidos os. Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {

            })
    });

    $('button#btnAceitarPedido').on('click.accept', function (e) {
        e.preventDefault();
        $(this).attr('disabled', true);
        dialogAceitarPedido.open();
    });
    $('form#frmAceitarPedido').on('submit.aceitar', function (e) {
        e.preventDefault();

        $(this).find('button[type=submit]').attr('disabled', true);
        $('div#contentDetails div#pbAceitarPedido').removeClass('mdc-linear-progress--closed');
        let idPedido =$('div#contentDetails span#idPedido').text();

        pedidosController.actualizarPedido({id: idPedido, isAccept:1, tempoDeEntrega:$('div#dialogAceitarPedido textarea#tempoDePreparo').val()})
            .done(function () {
                dialogNegarPedido.close();
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Pedido Aceite');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                dialogAceitarPedido.close();
                $('div#contentDetails div#novoPedidoContainer').hide();
                $('button#btnEstaPronto').show();
                initPedidosList(function () {
                    recuperarFocoDoItemDalista(idPedido);
                });
                pushMessageToClient('O seu pedido foi aceite e já está a ser preparado');

            })
            .fail(function(){
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao Aceitar. Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {
                $('div#contentDetails div#pbAceitarPedido').addClass('mdc-linear-progress--closed');
                $(e.target).find('button[type=submit]').attr('disabled', false);
            })
    });

    $('button#btnEstaPronto').on( "click.pronto", function (e) {
        e.preventDefault();
        dialogEstaPronto.open();
    });
    $('form#frmEstaPronto').on( "submit.pronto", function (e) {
        e.preventDefault();

        $(this).attr('disabled', true);
        $('div#contentDetails div#pbEstaPronto').removeClass('mdc-linear-progress--closed');
        let idPedido = $('div#contentDetails span#idPedido').text();

        pedidosController.actualizarPedido({id: idPedido, isDoneSuccessfully:1})
            .done(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('O cliente foi notificado que o pedido está pronto');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                $('div#contentDetails div#novoPedidoContainer').hide();
                $('button#btnEstaPronto').hide();
                dialogEstaPronto.close();
                initPedidosList(function () {
                    recuperarFocoDoItemDalista(idPedido);
                });
                pushMessageToClient('O seu pedido está pronto');
            })
            .fail(function(){
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao Aceitar Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {
                $('div#contentDetails div#pbEstaPronto').addClass('mdc-linear-progress--closed');
                $(e.target).attr('disabled', false);
            })
    });

    $('button#btnNegarPedido').on('click.negar', function (e) {
        e.preventDefault();
        dialogNegarPedido.open();
    });
    $('form#frmNegarPedido').on('submit.negar', function (e) {
        e.preventDefault();

        $(this).find('button[type=submit]').attr('disabled', true);
        $('div#contentDetails div#pbNegarPedidoo').removeClass('mdc-linear-progress--closed');

        pedidosController.actualizarPedido({id:$('div#contentDetails span#idPedido').text(), isAccept:0, isNotAcceptDetail:$(this).find('textarea#isNotAcceptDetail').val()})
            .done(function () {
                dialogNegarPedido.close();
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Pedido Negado');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                $('div#contentDetails div#novoPedidoContainer').hide();

                initPedidosList(function () {
                    recuperarFocoDoItemDalista(idPedido);
                });
                pushMessageToClient('O seu pedido foi negado');
            })
            .fail(function(){
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao negar Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {
                $('div#contentDetails div#pbNegarPedidoo').addClass('mdc-linear-progress--closed');
                $(e.target).find('button[type=submit]').attr('disabled', false);
            })
    });


    let listaActual;
    // -----------------------------  Pesquisar ------------------------//
    $("input#pesquisarPedido").on('focusin',function(e){
        if($(this).val() === ''){
            listaActual = $('ul#pedidosLista').html();
        }
    });
    let requisicao;
    $("input#pesquisarPedido").on('keyup',function(e){
        // Pesquisa
        let digitado =$("#pesquisarPedido").val();


        if(!(digitado===''))
        {

            if(requisicao){
                requisicao.abort();
            }
            $('ul#pedidosLista').html('');
            $('div#contentList div#pbPedidosLista').removeClass('mdc-linear-progress--closed');

            requisicao = pedidosController.pesquisarPorNome(digitado)
                .done(function (data, ts, xhr) {
                    requisicao = null;
                    if(xhr.status === 204){
                        $('ul#pedidosLista').html('<div class="mdc-typography--caption">Nenhum pedido encontrado</div>');
                    }else{
                        $('div#contentDetails div#novoPedidoContainer').hide();

                        $('ul#pedidosLista').html(buildListPedidosFromArray(data, null));
                        initNonDOMelements();
                    }

                })
                .fail(function (xhr) {
                    if(xhr.statusText!=='abort'){
                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao obter pedidos. Verifique a sua ligação à internet');
                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    }
                })
                .always(function () {
                    $('div#contentList div#pbPedidosLista').addClass('mdc-linear-progress--closed');
                });
        }else{
            $('ul#pedidosLista').html(listaActual);
        }


    });



    function initNonDOMelements(){
        responsivity();
        $('ul#pedidosLista li.mdc-list-item.pedidoItem').on('click.ver', function (e) {
            e.preventDefault();


            $('div#contentDetails div#pbPedidosDetail').removeClass('mdc-linear-progress--closed');

            $('ul#pedidosLista li.mdc-list-item').removeClass('mdc-list-item--selected');

            $(this).addClass('mdc-list-item--selected');

            pedidosController.obterPedidoForDetail($(this).find('span.idPedido').text())
                .done(function (data) {
                    buildPedidoDetail(data[0]);
                    //Todo Mostrar
                    $('div#contentDetails').show();
                })
                .fail(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Não conseguimos pegar os pedido. Verifique a sua ligação à internet');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                })
                .always(function () {

                    $('div#contentDetails div#pbPedidosDetail').addClass('mdc-linear-progress--closed');
                });

        });
    }

// ------------------------------  Defaults ------------------------------------------  //
    $('div#contentList div#pbPedidosLista').removeClass('mdc-linear-progress--closed');
    $('div#contentDetails').hide();
// ------------------------------  Defaults ------------------------------------------  //


 function initPedidosList(doneCallback){
     pedidosController.obterPedidosForListHoje()
         .done(function (data, textStatus, xhr) {
             if(xhr.status === 204){
                 $('ul#pedidosLista').html('<div class="mdc-typography--caption">Sem Pedidos por enquanto. Os pedidos surgem ao longo do dia. Fique atento</div>');
                 $('button#verPedidosAnteriores').show();
                 $('button#verPedidosDeHoje').hide();
             }else{
                 $('ul#pedidosLista').html(buildListPedidosFromArray(data, 'hoje', idPedido));
                 doneCallback();

                 initNonDOMelements();
             }
         })
         .fail(function () {
             $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Não conseguimos pegar os pedidos. Verifique a sua ligação à internet');
             new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
         })
         .always(function () {
             $('div#contentList div#pbPedidosLista').addClass('mdc-linear-progress--closed');
         });
 }

    pedidosController.obterPedidosForListHoje()
        .done(function (data, textStatus, xhr) {
            if(xhr.status === 204){
                $('ul#pedidosLista').html('<div class="mdc-typography--caption">Sem Pedidos por enquanto. Os pedidos surgem ao longo do dia. Fique atento</div>');
                $('button#verPedidosAnteriores').show();
                $('button#verPedidosDeHoje').hide();
            }else{
                $('ul#pedidosLista').html(buildListPedidosFromArray(data, 'hoje'));
                initNonDOMelements();
            }
        })
        .fail(function () {
            Pages.showErrorPage();
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Não conseguimos pegar os pedidos. Verifique a sua ligação à internet');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
        })
        .always(function () {
            $('div#contentList div#pbPedidosLista').addClass('mdc-linear-progress--closed');
        });

    // ---------------------  Util -------------------------   //
    function pushMessageToClient(body) {
        let idCliente = $('div#contentDetails span#idCliente').text();
        new PedidosController().pushMessageTo(idCliente,
            {
                "notification": {
                    "title": restaurante.nome,
                    "body": body,
                    "icon": "firebase-logo.png",
                    "click_action": "ao.startup.lubeasy.view.activity.PedidoDetailActivity"//"ao.startup.lubssy.activity.PedidoDetailActivity"
                },
                "data": {
                    "intent": 'pedido',
                    'idPedido': $('div#contentDetails span#idPedido').text()
                }
            })
            .done(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('O cliente recebeu a notificação');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .fail(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Não conseguimos notificar o cliente. Vamos tentar novamente em 10 segundos');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                setTimeout(pushMessageToClient(body), 10000);
            })
            .always(function () {

            })
    }
    function buildListPedidosFromArray(pedidosArray, hoje = true) {
        let pedidos = '';
        let tabindex = `tabindex="0"`;
        $('h3#txtHoje').hide();
        if(hoje) $('h3#txtHoje').show();

        pedidosArray.forEach(function callback(dados, index, array) {
            //Todo Icones. e o novoPedido
            if(dados.pedido.isDoneSuccessfully === 1){
                dados.pedido.isAccept = 2;
            }
            let isAccept = isAcceptToText(dados.pedido.isAccept);
            pedidos += `<li class="mdc-list-item pedidoItem" data-mdc-auto-init="MDCRipple" ${tabindex}>
                            <i class="mdc-list-item__graphic" style="background-color: #ff8d002e !important;">
                            <i class="material-icons mdc-theme--on-primary" style="color: rgb(255, 118, 0) !important;">${isAccept.icon}</i></i>
                            <span class="mdc-list-item__text">
                              <span class="mdc-list-item__primary-text">${dados.cliente.id}-${dados.pedido.id}: ${dados.cliente.nome}</span>
                              <span class="mdc-list-item__primary-text hide idPedido">${dados.pedido.id}</span>
                              <span class="mdc-list-item__secondary-text">${PHPdateTime('Y-m-d',dados.pedido.dataDeEmissao)} às ${PHPdateTime('h:i:s',dados.pedido.dataDeEmissao)}</span>
                            </span>
                            ${isAccept.sino}
                       </li>`;
            tabindex = '';
        });
        if(hoje){
            $('button#verPedidosAnteriores').show();
            $('button#verPedidosDeHoje').hide();
        }else {
            $('button#verPedidosAnteriores').hide();
            $('button#verPedidosDeHoje').show();
        }

        return pedidos;
    }

    function recuperarFocoDoItemDalista(id){
        $('ul#pedidosLista li.mdc-list-item.pedidoItem').each(function (index) {
            let $spanIdPedido = $(this).find('span.idPedido');
            if($spanIdPedido.text() === id){
                $(this).addClass('mdc-list-item--selected');
            }
        });
    }

    function buildPedidoDetail(dados) {
        if(dados.pedido.isDoneSuccessfully === 1){
            dados.pedido.isAccept = 2;
        }
        let isAccept = isAcceptToText(dados.pedido.isAccept);
        // Todo Tratar o IsAccept
        if (dados.pedido.isAccept === null) {
            $('div#contentDetails div#novoPedidoContainer').show();
        }else{
            $('div#contentDetails div#novoPedidoContainer').hide();
        }
        if(dados.pedido.isAccept === 1){
            $('button#btnEstaPronto').show();
        }else {
            $('button#btnEstaPronto').hide();
        }

        $('div#contentDetails button#txtEstadoPedido').text(isAccept.estado);

        $('div#contentDetails span#codPedido').text(`${dados.cliente.id}-${dados.pedido.id}`);
        $('div#contentDetails span#idPedido').text(dados.pedido.id);
        $('div#contentDetails span#idCliente').text(dados.cliente.id);
        $('div#contentDetails span#dataDeEmissao').text(PHPdateTime('Y-m-d',dados.pedido.dataDeEmissao));
        $('div#contentDetails span#receptLojaTiime').text(PHPdateTime('h:i:s',dados.pedido.dataDeEmissao));
        $('div#contentDetails span#tempoDeEntrega').text(dados.pedido.tempoDeEntrega);
        $('div#contentDetails span#nomeCliente').text(dados.cliente.nome);
        $('div#contentDetails span#endereco').text(dados.lugarcliente.endereco);
        $('div#contentDetails span#referencia').text(dados.lugarcliente.descricao);
        $('div#contentDetails span#formaDePagamento').text(dados.pedido.formaDePagamento);
        $('div#contentDetails span#typePedido').text(dados.pedido.typePedido);
        $('div#contentDetails span#observacoes').text(dados.pedido.observacoes);

        let itensDoPedido = '<li class="mdc-list-item" style="background-color: rgba(255,106,0,0.13);" tabindex="0">\n' +
            '                                <span class="mdc-list-item__graphic mdc-typography--headline6">Qtd.</span>\n' +
            '                                <span class="mdc-list-item__text mdc-typography--headline6">Item</span>\n' +
            '                                <span class="mdc-list-item__meta mdc-typography--headline6 mdc-theme--text-hint-on-light">Preço</span>\n' +
            '                            </li>';
        JSON.parse(dados.pedido.itensDoPedido).forEach(function (item){
            itensDoPedido += `<li class="mdc-list-item" >
                                <span class="mdc-list-item__graphic">${item.qtd}</span>
                                <span class="mdc-list-item__text">${item.nome}</span>
                                <span class="mdc-list-item__meta mdc-typography--body2 mdc-theme--text-hint-on-light">${item.preco} kz</span>
                            </li>`;
        });
        $('div#contentDetails ul#itemsList').html(itensDoPedido);

        $('div#contentDetails span#total').text(dados.pedido.total + ' kz');
        $('div#contentDetails span#subtotal').text(dados.pedido.subTotal + ' kz');
        $('div#contentDetails span#taxaDeEntrega').text(dados.pedido.taxaDeEntrega+ ' kz');

    }

    /*(function refreshPedidos(tempo){
        refreshPedidosTimeoutID = setTimeout(function () {
            new PedidosController().obterPedidosForListHoje()
                .done(function (data, textStatus, xhr) {
                    if(xhr.status === 204){

                    }else{
                        if(Number($('ul#pedidosLista li.mdc-list-item:first-child').find('span.idPedido').text()) === data[0].pedido.id)
                        {

                        }else{
                            $('ul#pedidosLista').html(buildListPedidosFromArray(data, 'hoje'));
                            if($('div#contentDetails:visible').length) recuperarFocoDoItemDalista(idPedido.innerText);
                            initNonDOMelements();
                        }

                    }
                })
                .fail(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Ups... a sua ligação caiu. Verifique a sua ligação à internet');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                })
                .always(function () {
                    refreshPedidos(tempo);
                    //console.log('hhh');
                    $('div#contentList div#pbPedidosLista').addClass('mdc-linear-progress--closed');
                });

        }, tempo)
    })(30000);*/

}

// ------------------------- Produtos --------------------------  //
function paginaProdutos(){
    let produtoActual;


    let dialogAddProduto = new mdc.dialog.MDCDialog(document.getElementById('dialogAddProduto'));
    let dialogApagarProduto = new mdc.dialog.MDCDialog(document.getElementById('dialogApagarProduto'));
    let dialogEditProduto = new mdc.dialog.MDCDialog(document.getElementById('dialogEditProduto'));
    let dialogEditImagemProduto = new mdc.dialog.MDCDialog(document.getElementById('dialogEditImagemProduto'));




    $('a#back_arrow').on('click.produto',function (e) {
        e.preventDefault();
        $('div#produtoDetails').fadeOut(function () {
            $('a#open_drawer').show();
            $('a#back_arrow').hide();
            $('div#produtoList').fadeIn(function () {});
        });
        $('button#btnAddProduto').fadeIn();
    });
    $('button#btnAddProduto').on('click.addProduto', function (){
        dialogAddProduto.open();
    });






    $('form#frmApagarProduto').on('submit.apagar',function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $(this).find('button[type=submit]').attr('disabled', true);
        $('div#pbApagarProduto').removeClass('mdc-linear-progress--closed');

        produtoController.apagarProdutoDoRestaurante(produtoActual.id)
            .done(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Produto Eliminado! A recarregar...');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                dialogApagarProduto.close();
                produtoController.obterProdutosDoRestaurante()
                    .done(function (data, textSatus, xhr) {
                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Recarregado');
                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                        if(xhr.status === 204){
                            $('div#produtosList').text('<div>Sem produtos para a loja</div>');
                        }else {
                            let buildedProdutos = buildProdutosFromArray(data);
                            $('div#produtoList').html(buildedProdutos);
                            initPagProdutosLayout();
                        }
                    }).fail(function(){
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('O produto foi eliminado mas ocorreu um erro ao recarregar. Verifique a sua ligação à internet e recarregue a página');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                });
            })
            .fail(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao eliminar. Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {
                $('div#pbApagarProduto').addClass('mdc-linear-progress--closed');
                $(e.target).find('button[type=submit]').attr('disabled', false);
            })

    });

    // ----------------------------   Apagar Produto ----------------------------- ///


    // ----------------------------   Add Produto ----------------------------- ///
    $( "form[name=frmAddProduto]" ).on( "submit.adicionar", function( event ) {
        event.preventDefault();
        event.stopImmediatePropagation();

        $(this).find('button[type=submit]').attr('disabled', true);
        $('div#pbAddProduto').removeClass('mdc-linear-progress--closed');
        let img = $(this).find('input[name=imagem]')[0].files[0];

        if(validarTipoDeImagem(img)){
            let formData = new FormData();

            formData.append('imagem', img);
            formData.append('JSON', JSON.stringify({
                nome: $(this).find('input[name=nome]').val(),
                categoria: $(this).find('input[name=categoria]:checked').val(),
                preco: $(this).find('input[name=preco]').val(),
                tempoDePreparo: $(this).find('input[name=tempoDePreparo]').val(),
                descricao: $(this).find('textarea[name=descricao]').val(),
            }, jsonReplacer));

            produtoController.criarProduto(formData)
                .done(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Produto adicionado!');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    dialogAddProduto.close();
                    produtoController.obterProdutosDoRestaurante()
                        .done(function (data, textSatus, xhr) {
                            if(xhr.status === 204){
                                $('div#produtosList').text('<div>Sem produtos para a loja</div>');
                            }else {
                                let buildedProdutos = buildProdutosFromArray(data);
                                $('div#produtoList').html(buildedProdutos);
                                initPagProdutosLayout();
                            }
                        });
                })
                .fail(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Produto não adicionado. Verifique os dados dos campos e a sua ligação na internet!');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                })
                .always(function () {
                    $('div#pbAddProduto').addClass('mdc-linear-progress--closed');
                    $(event.target).find('button[type=submit]').attr('disabled', false);
                });
            //TODO Upload de ficheiros com JQuery

        }else {
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao tentar guardar. Verifique se o ficheiro que seleccionou é uma imagem.');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            $('div#pbAddProduto').addClass('mdc-linear-progress--closed');
            $(event.target).find('button[type=submit]').attr('disabled', false);
        }
    });
    // ----------------------------   Add Produto ----------------------------- ///


    // -------------------- Editar Produto --------------------------------------------- ///
    let produtoEditar = {};
    $('input#imagemEditProduto').change(function (e) {
        produtoEditar.nome = $(this).val();
    });
    $('input#nomeEditProduto').change(function (e) {
        produtoEditar.nome = $(this).val();
    });
    $('textarea#descricaoEditProduto').change(function (e) {
        produtoEditar.descricao = $(this).val();
    });
    $('input#tempoDePreparoEditProduto').change(function (e) {
        produtoEditar.tempoDePreparo = $(this).val();
    });
    $('input#precoEditProduto').change(function (e) {
        produtoEditar.preco = $(this).val();
    });
    $('form#frmEditProduto input[name=categoria]').change(function (e) {
        produtoEditar.categoria = $(this).val();
    });
    dialogEditProduto.listen('MDCDialog:closing', function() {
        produtoEditar = {}
    });


    //Todo Refatorar e tratar a imagem
    function exibirDadosNoFormEditarProduto(produtoA) {
        $('input#nomeEditProduto').val(produtoA.nome);
        $('div#imagemViewEditProduto').css('background-image', produtoA.imagem);
        $('textarea#descricaoEditProduto').val(produtoA.descricao);
        $('input#tempoDePreparoEditProduto').val(produtoA.tempoDePreparo);
        $('input#precoEditProduto').val(produtoA.preco);

        //Desfaz o checked
        $(`form#frmEditProduto input[name=categoria]:checked`).prop('checked', false);

        $(`form#frmEditProduto input[value=${produtoA.categoria}`).prop('checked', true);
    }

    $('button#btnEditProduto').on('click.editar', function (e) {
        e.preventDefault();
        exibirDadosNoFormEditarProduto(produtoActual);
        dialogEditProduto.open();
    });
    $( "form#frmEditProduto" ).on( "submit.editar", function(e) {
        e.preventDefault();
        produtoEditar.id = produtoActual.id;

        //console.log('Edit Produto');

        $(e.target).find('button[type=submit]').attr('disabled', true);
        $('div#pbEditProduto').removeClass('mdc-linear-progress--closed');

        produtoController.actualizarProduto(produtoEditar)
            .done(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Guardado. A recarregar...');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();

                dialogEditProduto.close();

                produtoController.obterProdutosDoRestaurante()
                    .done(function (data, textStatus, xhr) {
                        if(xhr.status === 204){
                            $('div#produtosList').text('<div>Sem produtos para a loja</div>');
                        }else {
                            let buildedProdutos = buildProdutosFromArray(data);
                            $('div#produtoList').html(buildedProdutos);
                            initPagProdutosLayout();

                            produtoController.obterProdutosDoRestaurante(produtoActual.id)
                                .done(function (dados) {
                                    let produto = dados[0];

                                    produto.imagem = `url('${produto.imagem}')`;

                                    $('div#produtoDetails div#imagemProdutoDetailhe').css('background-image', produto.imagem);
                                    $('div#produtoDetails h5#nomeProdutoDetalhe').html(produto.nome);
                                    $('div#produtoDetails #categoriaProdutoDetalhe').html(produto.categoria);
                                    $('div#produtoDetails #precoProdutoDetalhe').html(produto.preco);
                                    $('div#produtoDetails #tempoDePreparoProdutoDetalhe').html(produto.tempoDePreparo);
                                    $('div#produtoDetails #descricaoProdutoDetalhe').html(produto.descricao);

                                    produtoActual = produto;


                                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Recarregado');
                                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                                })
                                .fail(function(){
                                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Falha ao recarregar. Actualize a pagina para ver as alteracoes');
                                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                                })
                        }
                    })
                    .fail(function () {
                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao recarregar. Verifique a sua ligação à internet');
                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    });
            })
            .fail(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao guardar. Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {
                $(e.target).find('button[type=submit]').attr('disabled', false);
                $('div#pbEditProduto').addClass('mdc-linear-progress--closed');
            });
    });



    // ---------- Editar Imagem Produto ------------------------ //

    $('button#btnAlterarImagem').on('click.modal', function (e) {
        e.preventDefault();
        dialogEditImagemProduto.open();
    });
    $('form#frmEditImagemProduto').on('submit.imagem', function (e) {
        e.preventDefault();

        //console.log('Imagem');

        $(e.target).find('button[type=submit]').attr('disabled', true);
        $('div#pbEditImagemProduto').removeClass('mdc-linear-progress--closed');

        let img = $(this).find('input[name=imagemEditProduto]')[0].files[0];

        if(validarTipoDeImagem(img)){
            let formData = new FormData();
            formData.append('imagem', img);
            produtoController.actualizarImagemProduto({id: produtoActual.id},formData)
                .done(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Guardada. A Recarregar...');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    dialogEditImagemProduto.close();
                    dialogEditProduto.close();

                    produtoController.obterProdutosDoRestaurante()
                        .done(function (data, textStatus, xhr) {
                            if(xhr.status === 204){
                                $('div#produtosList').text('<div>Sem produtos para a loja</div>');
                            }else {
                                let buildedProdutos = buildProdutosFromArray(data);
                                $('div#produtoList').html(buildedProdutos);
                                initPagProdutosLayout();

                                produtoController.obterProdutosDoRestaurante(produtoActual.id)
                                    .done(function (data) {
                                        let produto = data[0];

                                        produto.imagem = `url("${produto.imagem}")`;


                                        $('div#produtoDetails div#imagemProdutoDetailhe').css('background-image', produto.imagem);
                                        $('div#produtoDetails h5#nomeProdutoDetalhe').html(produto.nome);
                                        $('div#produtoDetails #categoriaProdutoDetalhe').html(produto.categoria);
                                        $('div#produtoDetails #precoProdutoDetalhe').html(produto.preco);
                                        $('div#produtoDetails #tempoDePreparoProdutoDetalhe').html(produto.tempoDePreparo);
                                        $('div#produtoDetails #descricaoProdutoDetalhe').html(produto.descricao);

                                        produtoActual = produto;

                                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Recarregado');
                                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                                    })
                                    .fail(function () {
                                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao recarregar. Verifique a sua ligação à internet');
                                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                                    });
                            }
                        })
                        .fail(function () {
                            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao recarregar. Verifique a sua ligação à internet');
                            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                        });
                })
                .fail(function () {

                })
                .always(function () {
                    $(e.target).find('button[type=submit]').attr('disabled', false);
                    $('div#pbEditImagemProduto').addClass('mdc-linear-progress--closed');
                });
        }else{
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao tentar guardar. Verifique se o ficheiro que seleccionou é uma imagem');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            $(e.target).find('button[type=submit]').attr('disabled', false);

        }
    });
    // ---------- Editar Imagem Produto ------------------------ //

    // -------------------- Editar Produto --------------------------------------------- ///


    function initPagProdutosLayout() {

        //Todo Detalhes Porduto
        $('div#produtoList .item').on('click.produto',function (e) {
            e.preventDefault();

            $('button#btnAddProduto').fadeOut();

            $('header span#pagTitulo').text('Produto');

            $('div#produtoList').fadeOut(function () {
                $('a#open_drawer').hide();
                $('a#back_arrow').show();
                $('div#produtoDetails').fadeIn(function () {

                });
            });
            produtoActual = getProdutoFromClickedCard(this);

            $('div#produtoDetails div#imagemProdutoDetailhe').css('background-image', produtoActual.imagem);
            $('div#produtoDetails h5#nomeProdutoDetalhe').html(produtoActual.nome);
            $('div#produtoDetails #categoriaProdutoDetalhe').html(produtoActual.categoria);
            $('div#produtoDetails #precoProdutoDetalhe').html(produtoActual.preco);
            $('div#produtoDetails #tempoDePreparoProdutoDetalhe').html(produtoActual.tempoDePreparo);
            $('div#produtoDetails #descricaoProdutoDetalhe').html(produtoActual.descricao);
        });

        // ----------------------------   Apagar Produto ----------------------------- ///
        $('div.mdc-card button.btnApagar').on('click.apagar', function (e) {
            e.preventDefault();
            produtoActual = getProdutoFromClickedCard(this);
            $('div#dialogApagarProduto span#nomeApagarProduto').text(produtoActual.nome);
            $('div#dialogApagarProduto span#precoApagarProduto').text(produtoActual.preco);
            $('div#dialogApagarProduto span#categoriaApagarProduto').text(produtoActual.categoria);

            dialogApagarProduto.open();
        });
        // ----------------------------   Apagar Produto ----------------------------- ///
    }




    // ----------------------    Util - - --- - ---- -- - - - -- - - - - - --- //

    function getProdutoFromClickedCard(clickedItem) {
        return {
            id: $(clickedItem).parents('div.mdc-card').find('span.idProduto').text(),
            imagem: $(clickedItem).parents('div.mdc-card').find('div.imagemProduto').css('background-image'),
            nome: $(clickedItem).parents('div.mdc-card').find('h2.nomeProduto').text(),
            categoria: $(clickedItem).parents('div.mdc-card').find('span.categoriaProduto').text(),
            preco: $(clickedItem).parents('div.mdc-card').find('span.precoProduto').text(),
            tempoDePreparo: $(clickedItem).parents('div.mdc-card').find('span.tempoDePreparoProduto').text(),
            descricao: $(clickedItem).parents('div.mdc-card').find('div.descricaoProduto').text()
        };
    }

    // ----------------------    Util - - --- - ---- -- - - - -- - - - - - --- //

    //Todo Produto

    produtoController.obterProdutosDoRestaurante()
        .done(function (data, textStatus, xhr) {
            if(xhr.status === 204){
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Ainda não criaste nenhum produto. Clica no botão laranja para criares um');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            }else {
                let buildedProdutos = buildProdutosFromArray(data);
                $('div#produtoList').html(buildedProdutos);
                initPagProdutosLayout();
            }

        })
        .fail(function () {
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao obter os produtos. Verifique a sua ligação na internet!');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
        });

    //Todo Fail e Always

    function buildProdutosFromArray(data) {
        let produtos = '';
        data.forEach(function callback(dados, index, array) {
            produtos += `<div class="mdc-layout-grid__cell--span-3 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-4-phone">\n` +
                `                <div class="mdc-card demo-card" style="height: 300px">\n` +
                `                    <div class="mdc-card__primary-action demo-card__primary-action item" data-mdc-auto-init="MDCRipple" tabindex="0">\n` +
                `                        <div class="mdc-card__media mdc-card__media--16-9 imagemProduto" style="background-image: url('${dados.produto.imagem}')"></div>\n` +
                `                        <span class="mdc-card__media-content mdc-typography--headline6">\n` +
                `                    </span>\n` +
                `                        <div class="" style="padding: 5px;">\n` +
                `                            <h2 class="mdc-typography mdc-typography--headline6 nomeProduto">${dados.produto.nome}</h2>\n` +
                `                            <span class="mdc-typography mdc-typography--subtitle2">Preço: <span class="precoProduto">${dados.produto.preco}</span> kz;</span>\n` +
                `                            <span style="display: none;" class="idProduto">${dados.produto.id}</span>\n` +
                `                            <span class="mdc-typography mdc-typography--subtitle2">Cat: <span class="categoriaProduto">${dados.produto.categoria}</span></span>\n` +
                `                            <span class="tempoDePreparoProduto" style="display: none;">${dados.produto.tempoDePreparo}</span>\n` +
                `                        </div>\n` +
                `                        <div style="padding: 5px; text-align: justify;" class="mdc-typography mdc-typography--body2 descricaoProduto">${dados.produto.descricao}</div>\n` +
                `                    </div>\n` +
                `                    <div class="mdc-card__actions">\n` +
                `                        <div class="mdc-card__action-buttons">
                                            <button class="mdc-button mdc-card__action mdc-card__action--button">
                                            <i class="material-icons mdc-button__icon" style="color: #ff002d!important;">favorite</i>
                                              <span class="mdc-button__label">${dados.avaliacao_produto.length?dados.avaliacao_produto.length:'0'}</span>
                                            </button>
                                          </div>`+
                `                        <div class="mdc-card__action-icons">\n` +
                `                            <button class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded btnApagar" title="Delete" data-mdc-ripple-is-unbounded="true">delete</button>\n` +
                `                        </div>\n` +
                `                    </div>\n` +
                `                </div>\n` +
                `            </div>`;
        });
        return produtos;
    }


}

// ------------------------- Promocoes --------------------------  //
function paginaPromocoes(){
    let promocaoActual;


    let dialogAddPromocao = new mdc.dialog.MDCDialog(document.getElementById('dialogAddPromocao'));
    let dialogApagarPromocao = new mdc.dialog.MDCDialog(document.getElementById('dialogApagarPromocao'));
    let dialogEditPromocao = new mdc.dialog.MDCDialog(document.getElementById('dialogEditPromocao'));
    let dialogEditImagemPromocao = new mdc.dialog.MDCDialog(document.getElementById('dialogEditImagemPromocao'));




    $('a#back_arrow').on('click.promocao',function (e) {
        e.preventDefault();
        $('div#promocaoDetails').fadeOut(function () {
            $('a#open_drawer').show();
            $('a#back_arrow').hide();
            $('div#promocaoList').fadeIn(function () {});
        });
        $('button#btnAddPromocao').fadeIn();
    });
    $('button#btnAddPromocao').on('click.addPromocao', function (){
        dialogAddPromocao.open();
    });






    $('form#frmApagarPromocao').on('submit.apagar',function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $(this).find('button[type=submit]').attr('disabled', true);
        $('div#pbApagarPromocao').removeClass('mdc-linear-progress--closed');

        promocaoController.apagarPromocaoDoRestaurante(promocaoActual.id)
            .done(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Promocao Eliminada! A recarregar...');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                dialogApagarPromocao.close();
                promocaoController.obterPromocoesDoRestaurante()
                    .done(function (data, textSatus, xhr) {
                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Recarregado');
                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                        if(xhr.status === 204){
                            $('div#promocoesList').text('<div>Sem promocoes para a loja</div>');
                        }else {
                            let buildedPromocoes = buildPromocoesFromArray(data);
                            $('div#promocaoList').html(buildedPromocoes);
                            initPagPromocoesLayout();
                        }
                    }).fail(function(){
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('A promocao foi eliminada mas ocorreu um erro ao recarregar. Verifique a sua ligação à internet e recarregue a página');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                });
            })
            .fail(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao eliminar. Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {
                $('div#pbApagarPromocao').addClass('mdc-linear-progress--closed');
                $(e.target).find('button[type=submit]').attr('disabled', false);
            })

    });

    // ----------------------------   Apagar Promocao ----------------------------- ///


    // ----------------------------   Add Promocao ----------------------------- ///
    $( "form[name=frmAddPromocao]" ).on( "submit.adicionar", function( event ) {
        event.preventDefault();
        event.stopImmediatePropagation();

        $(this).find('button[type=submit]').attr('disabled', true);
        $('div#pbAddPromocao').removeClass('mdc-linear-progress--closed');
        let img = $(this).find('input[name=imagem]')[0].files[0];

        if(validarTipoDeImagem(img)){
            let formData = new FormData();

            formData.append('imagem', img);
            formData.append('JSON', JSON.stringify({
                nome: $(this).find('input[name=nome]').val(),
                categoria: $(this).find('input[name=categoria]:checked').val(),
                preco: $(this).find('input[name=preco]').val(),
                dataTermino: $(this).find('input[name=dataTermino]').val(),
                descricao: $(this).find('textarea[name=descricao]').val(),
            }, jsonReplacer));

            promocaoController.criarPromocao(formData)
                .done(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Promocao adicionada. A recarregar...');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    dialogAddPromocao.close();
                    promocaoController.obterPromocoesDoRestaurante()
                        .done(function (data, textSatus, xhr) {
                            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Recarregado');
                            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();

                            if(xhr.status === 204){
                                $('div#promocoesList').text('<div>Sem promocoes para a loja</div>');
                            }else {
                                let buildedPromocoes = buildPromocoesFromArray(data);
                                $('div#promocaoList').html(buildedPromocoes);
                                initPagPromocoesLayout();
                            }
                        })
                        .fail(function () {
                            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao recarregar. Tente actualizar a página');
                            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                        });
                })
                .fail(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Promocao não adicionada. Verifique os dados dos campos e a sua ligação na internet!');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                })
                .always(function () {
                    $('div#pbAddPromocao').addClass('mdc-linear-progress--closed');
                    $(event.target).find('button[type=submit]').attr('disabled', false);
                });
            //TODO Upload de ficheiros com JQuery

        }else {
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao tentar guardar. Verifique se o ficheiro que seleccionou é uma imagem.');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            $('div#pbAddPromocao').addClass('mdc-linear-progress--closed');
            $(event.target).find('button[type=submit]').attr('disabled', false);
        }
    });
    // ----------------------------   Add Promocao ----------------------------- ///


    // -------------------- Editar Promocao --------------------------------------------- ///
    let promocaoEditar = {};
    $('input#nomeEditPromocao').change(function (e) {
        promocaoEditar.nome = $(this).val();
    });
    $('textarea#descricaoEditPromocao').change(function (e) {
        promocaoEditar.descricao = $(this).val();
    });
    $('input#dataTerminoEditPromocao').change(function (e) {
        promocaoEditar.dataTermino = $(this).val();
    });
    $('input#precoEditPromocao').change(function (e) {
        promocaoEditar.preco = $(this).val();
    });
    dialogEditPromocao.listen('MDCDialog:closing', function() {
        promocaoEditar = {}
    });


    //Todo Refatorar e tratar a imagem
    function exibirDadosNoFormEditarPromocao(promocaoA) {
        $('input#nomeEditPromocao').val(promocaoA.nome);
        $('div#imagemViewEditPromocao').css('background-image', promocaoA.imagem);
        $('textarea#descricaoEditPromocao').val(promocaoA.descricao);
        $('form#frmEditPromocao input#dataTerminoEditPromocao').val(promocaoA.dataTermino);
        $('input#precoEditPromocao').val(promocaoA.preco);
    }

    $('button#btnEditPromocao').on('click.editar', function (e) {
        e.preventDefault();
        exibirDadosNoFormEditarPromocao(promocaoActual);
        dialogEditPromocao.open();
    });
    $( "form#frmEditPromocao" ).on( "submit.editar", function(e) {
        e.preventDefault();
        promocaoEditar.id = promocaoActual.id;


        $(e.target).find('button[type=submit]').attr('disabled', true);
        $('div#pbEditPromocao').removeClass('mdc-linear-progress--closed');

        promocaoController.actualizarPromocao(promocaoEditar)
            .done(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Guardado. A recarregar...');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();

                dialogEditPromocao.close();

                promocaoController.obterPromocoesDoRestaurante()
                    .done(function (data, textStatus, xhr) {
                        if(xhr.status === 204){
                            $('div#promocoesList').text('<div>Sem promocoes para a loja</div>');
                        }else {
                            let buildedPromocoes = buildPromocoesFromArray(data);
                            $('div#promocaoList').html(buildedPromocoes);
                            initPagPromocoesLayout();

                            promocaoController.obterPromocoesDoRestaurante(promocaoActual.id)
                                .done(function (dados) {
                                    let promocao = dados[0];

                                    promocao.imagem = `url('${promocao.imagem}')`;
                                    promocao.dataTermino = PHPdateTime('Y-m-d',promocao.dataTermino);
                                    promocao.dataDeCriacao = PHPdateTime('Y-m-d',promocao.dataDeCriacao);

                                    promocaoActual = promocao;
                                    insertPromocaoToPromocaoDetail(promocaoActual);


                                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Recarregado');
                                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                                })
                                .fail(function(){
                                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Falha ao recarregar. Actualize a pagina para ver as alteracoes');
                                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                                })
                        }
                    })
                    .fail(function () {
                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao recarregar. Verifique a sua ligação à internet');
                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    });
            })
            .fail(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao guardar. Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {
                $(e.target).find('button[type=submit]').attr('disabled', false);
                $('div#pbEditPromocao').addClass('mdc-linear-progress--closed');
            });
    });



    // ---------- Editar Imagem Promocao ------------------------ //

    $('button#btnAlterarImagem').on('click.modal', function (e) {
        e.preventDefault();
        dialogEditImagemPromocao.open();
    });
    $('form#frmEditImagemPromocao').on('submit.imagem', function (e) {
        e.preventDefault();

        //console.log('Imagem');

        $(e.target).find('button[type=submit]').attr('disabled', true);
        $('div#pbEditImagemPromocao').removeClass('mdc-linear-progress--closed');

        let img = $(this).find('input[name=imagemEditPromocao]')[0].files[0];

        if(validarTipoDeImagem(img)){
            let formData = new FormData();
            formData.append('imagem', img);
            promocaoController.actualizarImagemPromocao({id: promocaoActual.id},formData)
                .done(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Guardada. A Recarregar...');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    dialogEditImagemPromocao.close();
                    dialogEditPromocao.close();

                    promocaoController.obterPromocoesDoRestaurante()
                        .done(function (data, textStatus, xhr) {
                            if(xhr.status === 204){
                                $('div#promocoesList').text('<div>Sem promocoes para a loja</div>');
                            }else {
                                let buildedPromocoes = buildPromocoesFromArray(data);
                                $('div#promocaoList').html(buildedPromocoes);
                                initPagPromocoesLayout();

                                promocaoController.obterPromocoesDoRestaurante(promocaoActual.id)
                                    .done(function (data) {
                                        let promocao = data[0];

                                        promocao.imagem = `url("${promocao.imagem}")`;
                                        promocao.dataTermino = PHPdateTime('Y-m-d',promocao.dataTermino);
                                        promocao.dataDeCriacao = PHPdateTime('Y-m-d',promocao.dataDeCriacao);

                                        promocaoActual = promocao;
                                        insertPromocaoToPromocaoDetail(promocaoActual);

                                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Recarregado');
                                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                                    })
                                    .fail(function () {
                                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao recarregar. Verifique a sua ligação à internet');
                                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                                    });
                            }
                        })
                        .fail(function () {
                            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao recarregar. Verifique a sua ligação à internet');
                            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                        });
                })
                .fail(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao guardar');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                })
                .always(function () {
                    $(e.target).find('button[type=submit]').attr('disabled', false);
                    $('div#pbEditImagemPromocao').addClass('mdc-linear-progress--closed');
                });
        }else{
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao tentar guardar. Verifique se o ficheiro que seleccionou é uma imagem');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            $(e.target).find('button[type=submit]').attr('disabled', false);

        }
    });
    // ---------- Editar Imagem Promocao ------------------------ //

    // -------------------- Editar Promocao --------------------------------------------- ///


    function initPagPromocoesLayout() {

        //Todo Detalhes Porduto
        $('div#promocaoList .item').on('click.promocao',function (e) {
            e.preventDefault();

            $('button#btnAddPromocao').fadeOut();

            $('header span#pagTitulo').text('Promocao');

            $('div#promocaoList').fadeOut(function () {
                $('a#open_drawer').hide();
                $('a#back_arrow').show();
                $('div#promocaoDetails').fadeIn(function () {

                });
            });
            promocaoActual = getPromocaoFromClickedCard(this);
            insertPromocaoToPromocaoDetail(promocaoActual);

        });

        // ----------------------------   Apagar Promocao ----------------------------- ///
        $('div.mdc-card button.btnApagar').on('click.apagar', function (e) {
            e.preventDefault();
            promocaoActual = getPromocaoFromClickedCard(this);
            $('div#dialogApagarPromocao span#nomeApagarPromocao').text(promocaoActual.nome);
            $('div#dialogApagarPromocao span#precoApagarPromocao').text(promocaoActual.preco);
            $('div#dialogApagarPromocao span#categoriaApagarPromocao').text(promocaoActual.categoria);

            dialogApagarPromocao.open();
        });
        // ----------------------------   Apagar Promocao ----------------------------- ///
    }




    // ----------------------    Util - - --- - ---- -- - - - -- - - - - - --- //
    function insertPromocaoToPromocaoDetail(promo) {
        $('div#promocaoDetails div#imagemPromocaoDetailhe').css('background-image', promo.imagem);
        $('div#promocaoDetails h5#nomePromocaoDetalhe').text(promo.nome);
        $('div#promocaoDetails #dataTerminoPromocaoDetalhe').text(promo.dataTermino);
        $('div#promocaoDetails #dataDeCriacaoPromocaoDetalhe').text(promo.dataDeCriacao);
        $('div#promocaoDetails #precoPromocaoDetalhe').text(promo.preco);
        $('div#promocaoDetails #descricaoPromocaoDetalhe').text(promo.descricao);
    }
    function getPromocaoFromClickedCard(clickedItem){
        return {
            id: $(clickedItem).parents('div.mdc-card').find('span.idPromocao').text(),
            imagem: $(clickedItem).parents('div.mdc-card').find('div.imagemPromocao').css('background-image'),
            nome: $(clickedItem).parents('div.mdc-card').find('h2.nomePromocao').text(),
            dataTermino: $(clickedItem).parents('div.mdc-card').find('span.dataTerminoPromocao').text(),
            dataDeCriacao: $(clickedItem).parents('div.mdc-card').find('span.dataDeCriacaoPromocao').text(),
            preco: $(clickedItem).parents('div.mdc-card').find('span.precoPromocao').text(),
            descricao: $(clickedItem).parents('div.mdc-card').find('div.descricaoPromocao').text()
        };
    }

    // ----------------------    Util - - --- - ---- -- - - - -- - - - - - --- //

    //Todo Promocao

    promocaoController.obterPromocoesDoRestaurante()
        .done(function (data, textStatus, xhr) {
            if(xhr.status === 204){
                $('div#promocoesList').text('<div>Sem promocoes para a loja</div>');
            }else {
                let buildedPromocoes = buildPromocoesFromArray(data);
                $('div#promocaoList').html(buildedPromocoes);
                initPagPromocoesLayout();
            }

        })
        .fail(function () {
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao obter os promocoes. Verifique a sua ligação na internet!');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
        });

    //Todo Fail e Always

    function buildPromocoesFromArray(data) {
        let promocoes = '';
        data.forEach(function callback(promocao, index, array) {
            promocoes += `<div class="mdc-layout-grid__cell--span-3 mdc-layout-grid__cell--span-4-tablet mdc-layout-grid__cell--span-4-phone">\n` +
                `                <div class="mdc-card demo-card" style="height: 300px">\n` +
                `                    <div class="mdc-card__primary-action demo-card__primary-action item" data-mdc-auto-init="MDCRipple" tabindex="0">\n` +
                `                        <div class="mdc-card__media mdc-card__media--16-9 imagemPromocao" style="background-image: url('${promocao.imagem}')"></div>\n` +
                `                        <span class="mdc-card__media-content mdc-typography--headline6">\n` +
                `                        <!--<i class=" material-icons mdc-theme--primary">star</i> 4,5\n-->` +
                `                    </span>\n` +
                `                        <div class="" style="padding: 5px;">\n` +
                `                            <h2 class="mdc-typography mdc-typography--headline6 nomePromocao">${promocao.nome}</h2>\n` +
                `                            <span class="mdc-typography mdc-typography--subtitle2">Preço: <span class="precoPromocao">${promocao.preco}</span> kz;</span>\n` +
                `                            <span style="display: none;" class="idPromocao">${promocao.id}</span>\n` +
                `                            <span class="mdc-typography mdc-typography--subtitle2"><span class="dataDeCriacaoPromocao hide">${PHPdateTime('Y-m-d',promocao.dataDeCriacao)}</span>Até <span class="dataTerminoPromocao">${PHPdateTime('Y-m-d',promocao.dataTermino)}</span></span>\n` +
                `                        </div>\n` +
                `                        <div style="padding: 5px; text-align: justify;" class="mdc-typography mdc-typography--body2 descricaoPromocao">${promocao.descricao}</div>\n` +
                `                    </div>\n` +
                `                    <div class="mdc-card__actions">\n` +
                `                        <div class="mdc-card__action-icons">\n` +
                `                            <button class="mdc-icon-button material-icons mdc-card__action mdc-card__action--icon--unbounded btnApagar" title="Delete" data-mdc-ripple-is-unbounded="true">delete</button>\n` +
                `                        </div>\n` +
                `                    </div>\n` +
                `                </div>\n` +
                `            </div>`;
        });
        return promocoes;
    }


}

// ------------------------- Definicoes --------------------------  //
function paginaDefinicoes(){
    let $definicoesLayout = $('form#frmDefinicoes');
    let restauranteValues={};
    let dialogRedefinirSenha = new mdc.dialog.MDCDialog(document.getElementById('dialogRedefinirSenha'));
    let dialogEditLogotipoRestaurante = new mdc.dialog.MDCDialog(document.getElementById('dialogEditLogotipoRestaurante'));

    dialogRedefinirSenha.listen('MDCDialog:closing', function() {
        $('input[name=novaSenha]').val('');
        $('input[name=confirmacaoSenha]').val('');
        $('form#frmSenha').unbind('submit');
    });

    function setValues() {
        $definicoesLayout.find('input[name="nome"]').val(restaurante.nome);
        $definicoesLayout.find('input[name="localDeReferencia"]').val(restaurante.localDeReferencia);
        $definicoesLayout.find('input[name="horario"]').val(restaurante.horario);
        $definicoesLayout.find('input[name="telefone"]').val(restaurante.telefone);
        $definicoesLayout.find('input[name="taxaDeEntrega"]').val(restaurante.taxaDeEntrega);

        $definicoesLayout.find('input[name="endereco"]').val(restaurante.endereco);
        $definicoesLayout.find('input[name="localDeReferencia"]').val(restaurante.localDeReferencia);


        $definicoesLayout.find('textarea[name="objectivo"]').val(restaurante.objectivo);

        $definicoesLayout.find('select[name="categoria"]').find(`option[value="${restaurante.categoria}"]`).attr('selected', true);
        $definicoesLayout.find('select[name="provincia"]').find(`option[value="${restaurante.provincia}"]`).attr('selected', true);
        $definicoesLayout.find('select[name="municipio"]').find(`option[value="${restaurante.municipio}"]`).attr('selected', true);


        $definicoesLayout.find('input[name="typeService"]').attr('checked', Boolean(Number(restaurante.taxaDeEntrega)));
        $definicoesLayout.find('input[name="payMoney"]').attr('checked', Boolean(Number(restaurante.payMoney)));
        $definicoesLayout.find('input[name="payTPA"]').attr('checked', Boolean(Number(restaurante.payTPA)));
        $definicoesLayout.find('input[name="payOnline"]').attr('checked', Boolean(Number(restaurante.payOnline)));
    }


    $definicoesLayout.find('input[name="nome"]').change(function () {
        restauranteValues.nome = $(this).val();
    });
    $definicoesLayout.find('input[name="endereco"]').change(function () {
        restauranteValues.endereco = $(this).val();
    });
    $definicoesLayout.find('input[name="localDeReferencia"]').change(function () {
        restauranteValues.localDeReferencia = $(this).val();
    });
    $definicoesLayout.find('input[name="horario"]').change(function () {
        restauranteValues.horario = $(this).val();
    });
    $definicoesLayout.find('input[name="telefone"]').change(function () {
        restauranteValues.telefone = $(this).val();
    });
    $definicoesLayout.find('textarea[name="objectivo"]').change(function () {
        restauranteValues.objectivo = $(this).val();
    });
    $definicoesLayout.find('select[name="categoria"]').change(function () {
        restauranteValues.categoria = $(this).val();
    });
    $definicoesLayout.find('select[name="provincia"]').change(function () {
        restauranteValues.provincia = $(this).val();
    });
    $definicoesLayout.find('select[name="municipio"]').change(function () {
        restauranteValues.municipio = $(this).val();
    });
    $definicoesLayout.find('input[name="typeService"]').change(function () {
        restauranteValues.typeService = this.checked;
    });
    $definicoesLayout.find('input[name="taxaDeEntrega"]').change(function () {
        restauranteValues.taxaDeEntrega = $(this).val();
    });
    $definicoesLayout.find('input[name="payMoney"]').change(function () {
        restauranteValues.payMoney = this.checked;
    });
    $definicoesLayout.find('input[name="payTPA"]').change(function () {
        restauranteValues.payTPA = this.checked;
    });
    $definicoesLayout.find('input[name="payOnline"]').change(function () {
        restauranteValues.payOnline = this.checked;
    });

    setValues();



    $definicoesLayout.submit(function (e) {
        e.preventDefault();
        $(e.target).find('button[type=submit]').attr('disabled', true);
        dialogInserirSenhaParaPaginas('exibir', function () {
            restauranteController.actualizarRestaurante(restauranteValues)
                .done(function (dados) {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Dados Actualizados. Espere só um pouco. Estamos a configurar...');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    restauranteController.obterDadosRestaurante()
                        .done(function (data) {
                            restaurante = data[0];

                            setValues();
                            initDrawer();
                            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Configurado!');
                            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                        })
                })
                .fail(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro na conexão. Por favor, verifique a sua conexão à internet');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                })
                .always(function () {
                    $(e.target).find('button[type=submit]').attr('disabled', false);
                })
        });

    });

    $('a#btnRedefinirSenha').click(function (e) {
        e.preventDefault();
        dialogInserirSenhaParaPaginas('exibir', function () {
            dialogRedefinirSenha.open();
        })
    });
    $('form#frmRedefinirSenha').submit(function (e) {
        e.preventDefault();
        let senhaActual = $(e.target).find('input[name=novaSenha]').val();
        //Todo Verificar os campos
        //TODO Funcao Verificadora de Senha
        if(senhaActual === $(e.target).find('input[name=confirmacaoSenha]').val()){
            restauranteController.actualizarRestaurante({senha: senhaActual})
                .done(function (){
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Senha Guardada');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    dialogRedefinirSenha.close();
                });
        }else {
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('As Senhas são diferentes');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
        }
    });



    $('button#btnAlterarLogotipo').on('click.modal', function (e) {
        e.preventDefault();
        dialogEditLogotipoRestaurante.open();
    });
    $('form#frmEditLogotipoRestaurante').on('submit.imagem', function (e) {
        e.preventDefault();
        $(e.target).find('button[type=submit]').attr('disabled', true);
        $('div#pbEditLogotipoRestaurante').removeClass('mdc-linear-progress--closed');

        let img = $(this).find('input[name=logotipo]')[0].files[0];

        if(validarTipoDeImagem(img)){
            let formData = new FormData();
            formData.append('logotipo', img);
            dialogInserirSenhaParaPaginas('exibir', function () {
                restauranteController.actualizarLogotipo(formData)
                    .done(function () {
                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Guardada. A Sincronizar...');
                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                        dialogEditLogotipoRestaurante.close();

                        restauranteController.obterDadosRestaurante()
                            .done(function (data, textStatus, xhr) {
                                restaurante = data[0];

                                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Sincronizado');
                                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                            })
                            .fail(function () {
                                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao sincronizar. Verifique a sua ligação à internet');
                                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                            });
                    })
                    .fail(function () {
                        $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro ao guardar. Verifique a sua ligação à internet');
                        new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                    })
                    .always(function () {
                        $(e.target).find('button[type=submit]').attr('disabled', false);
                        $('div#pbEditImagemProduto').addClass('mdc-linear-progress--closed');
                    });
            });

        }else{
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Erro. Verifique se o ficheiro que seleccionou é uma imagem');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            $(e.target).find('button[type=submit]').attr('disabled', false);

        }
    });
}

function paginaNotificacoes() {
    // ---------------- Responsividade --------------------- //

    function responsivity() {
        let contentDetails = $('div#contentDetails');
        let contentList = $('div#contentList');
        if((document.body.clientWidth<432) && (contentDetails.length!==0) && (contentList.length !==0)){
            contentDetails.hide();
            $('div#contentList .mdc-list-group').addClass('semBordaDireita');
            constructEventsOnPhone();
        }else{
            destroyEventsOnPhone();
            $('div#contentList .mdc-list-group').removeClass('semBordaDireita');
            contentDetails.show();

        }
    }
// ---------------- UI --------------------- ///
    function constructEventsOnPhone(){

        $('a#back_arrow').click(function (e) {
            e.preventDefault();
            $('div#contentDetails').fadeOut(function () {
                $('a#open_drawer').show();
                $('a#back_arrow').hide();
                $('div#contentList').fadeIn(function () {});
            });
        });

        //$('div#contentList  ul#notificacoesLista .mdc-list-item.notificacaoItem').on('click.responsivo',function () {
        $('ul#notificacoesLista li.mdc-list-item.notificacaoItem').on('click.responsivo',function () {
            //console.log('hhh2');
            $('div#contentList').fadeOut(function () {
                $('a#open_drawer').hide();
                $('a#back_arrow').show();
                $('div#contentDetails').fadeIn(function () {});
            });
        });
    }
    function destroyEventsOnPhone() {
        //$('a#back_arrow').click(function () {});
        //$('div#contentList ul#notificacoesLista .mdc-list-item.notificacaoItem').off('click.responsivo');
        $('ul#notificacoesLista li.mdc-list-item.notificacaoItem').off('click.responsivo');

    }
// ---------------- UI --------------------- ///
    responsivity();
    window.addEventListener('resize',responsivity);

    // ---------------- Responsividade --------------------- //



    // ------------------------------  Defaults ------------------------------------------  //
    $('div#contentList div#pbNotificacoesLista').removeClass('mdc-linear-progress--closed');
    $('div#contentDetails').hide();
// ------------------------------  Defaults ------------------------------------------  //


    function initNonDOMelements(){
        responsivity();
        $('ul#notificacoesLista li.mdc-list-item.notificacaoItem').on('click.ver', function (e) {
            e.preventDefault();
            $('div#contentDetails').show();

            $('div#contentDetails div#pbNotificacoesDetail').removeClass('mdc-linear-progress--closed');

            $('ul#notificacoesLista li.mdc-list-item').removeClass('mdc-list-item--selected');

            $(this).addClass('mdc-list-item--selected');

            notificacoesController.obterNotificacaoForDetail($(this).find('span.idNotificacao').text())
                .done(function (data) {
                    buildNotificacaoDetail(data[0]);
                    //Todo Mostrar
                    //console.log('Detail');
                    $('div#contentDetails').show();
                })
                .fail(function () {
                    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Não conseguimos pegar os pedido. Verifique a sua ligação à internet');
                    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                })
                .always(function () {
                    $('div#contentDetails div#pbNotificacoesDetail').addClass('mdc-linear-progress--closed');
                });

        });
    }

    function initPedidosList(doneCallback){
        pedidosController.obterPedidosForListHoje()
            .done(function (data, textStatus, xhr) {
                if(xhr.status === 204){
                    $('ul#pedidosLista').html('<div class="mdc-typography--caption">Sem Pedidos por enquanto. Os pedidos surgem ao longo do dia. Fique atento</div>');
                    $('button#verPedidosAnteriores').show();
                    $('button#verPedidosDeHoje').hide();
                }else{
                    $('ul#pedidosLista').html(buildListPedidosFromArray(data, 'hoje', idPedido));
                    doneCallback();

                    initNonDOMelements();
                }
            })
            .fail(function () {
                $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Não conseguimos pegar os pedidos. Verifique a sua ligação à internet');
                new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
            })
            .always(function () {
                $('div#contentList div#pbPedidosLista').addClass('mdc-linear-progress--closed');
            });
    }

    notificacoesController.obterNotificacoesForList()
        .done(function (data, textStatus, xhr) {
            if(xhr.status === 204){
                $('ul#notificacoesLista').html('<div class="mdc-typography--caption">Sem Notificacoes por equanto</div>');
            }else{
                $('ul#notificacoesLista').html(buildListPedidosFromArray(data));
                initNonDOMelements();
            }
        })
        .fail(function () {
            Pages.showErrorPage();
            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Não conseguimos pegar as notificaoes. Verifique a sua ligação à internet');
            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
        })
        .always(function () {
            $('div#contentList div#pbNotificacoesLista').addClass('mdc-linear-progress--closed');
        });


    // ----------------------------------UTIL --------------------- ///
    function buildListPedidosFromArray(notificacoesArray) {
        let notificacoes = '';
        let tabindex = `tabindex="0"`;

        notificacoesArray.forEach(function callback(notify) {

            notificacoes += `<li class="mdc-list-item notificacaoItem" data-mdc-auto-init="MDCRipple" ${tabindex}>
                            <i class="mdc-list-item__graphic" style="background-color: #ff8d002e !important;">
                            <i class="material-icons mdc-theme--on-primary" style="color: rgb(255, 118, 0) !important;">notifications</i></i>
                            <span class="mdc-list-item__text">
                              <span class="mdc-list-item__primary-text">${notify.titulo}</span>
                              <span class="mdc-list-item__primary-text hide idNotificacao">${notify.id}</span>
                              <span class="mdc-list-item__secondary-text">${PHPdateTime( 'd-m-Y',notify.dataDeEmissao)} às ${PHPdateTime('h:i:s', notify.dataDeEmissao)}</span>
                            </span>
                       </li>`;
            tabindex = '';
        });

        return notificacoes;
    }

    /*function recuperarFocoDoItemDalista(id){
        $('ul#pedidosLista li.mdc-list-item.pedidoItem').each(function (index) {
            let $spanIdPedido = $(this).find('span.idPedido');
            if($spanIdPedido.text() === id){
                $(this).addClass('mdc-list-item--selected');
            }
        });
    }*/

    function buildNotificacaoDetail(notificacao) {
        $('div#contentDetails span#idNotificacao').text(notificacao.id);
        $('div#contentDetails #titulo').text(notificacao.titulo);
        $('div#contentDetails span#dataDeEmissao').text(`${PHPdateTime( 'd-m-Y',notificacao.dataDeEmissao)} às ${PHPdateTime('h:i:s', notificacao.dataDeEmissao)}`);
        $('div#contentDetails div#descricao').html(`${notificacao.descricao}`);

        $('div#contentDetails div#descricao a').on('click.resp', function(e){
            e.preventDefault();
            history.pushState(restaurante, "Lubeasy", `index.php?action=${$(this).attr('href')}`);
            INTENT(true);
        });
    }

    // ----------------------------------UTIL --------------------- ///


}










/*
let payload = {
    notification:{
        title:'Novo Pedido',
        body: 'Aceita o pedido',
        icon:'iconma'
    },
    data:{
        intent: 'pag/pedidos',
        idPedido: 'ashhjsa'
    }
};
$('#teste').click(function (e) {
    e.preventDefault();

});
*/








// ------------------------- Firebase Cloud Messaging FCM --------------------------------- //

// Initialize Firebase
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDAHkN6WdkV6Zpg3hBE-qALFZtzxk2ocaI",
    authDomain: "lubeasy.firebaseapp.com",
    databaseURL: "https://lubeasy.firebaseio.com",
    projectId: "lubeasy",
    storageBucket: "lubeasy.appspot.com",
    messagingSenderId: "208924966875",
    appId: "1:208924966875:web:9884ac548d51eb5c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BBZWXK4sNweLoszRicNHb5BSkh_mnMbB2ZCVw5EAQ_4EbO_qGC70A_lITY_KkR9pqTRPbySepMXzd1vtXSJ_WnQ");


messaging.requestPermission().then(function() {
        getToken();
    }).catch(function(err) {
        messaging.requestPermission().then(function() {
            getToken();
        });
    });


function getToken(){
    messaging.getToken().then(function(currentToken) {
        if (currentToken) {
            if(restaurante.id == null)
            new RestauranteController().obterDadosRestaurante()
                .done(function (data) {
                    restaurante = data[0];
                    //Todo Guardar o token na base de dados
                    restauranteController.actualizarRestaurante({ id: restaurante.id, fcmToken: currentToken })
                        .done(function () {
                            restaurante.fcmToken = currentToken;
                            //console.log('token: ', currentToken);
                        })
                        .fail(function () {
                            $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Falha ao Obter o mecanismo de notificações. Recarregue a página');
                            new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
                        })
                        .always(function () {

                        });
                });


        } else {
            console.log('No Instance ID token available. Request permission to generate one.');
        }
    }).catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
    });
}


messaging.onTokenRefresh(function() {
    getToken();
});

messaging.onMessage(function(payload) {
    let notification = new Notification(payload.notification.title, {body:payload.notification.body,icon:payload.notification.icon});

    notification.onclick = function (){
        $(`aside.mdc-drawer a.mdc-list-item[href='pag/pedidos']`).trigger('click');
        $('span#pedidoPin').addClass('hide');
        Pages.navigateToUrl();
    };
    $('header span#pedidoPin').removeClass('hide');

    $('.mdc-snackbar#failResponse .mdc-snackbar__label').text('Novo pedido recebido');
    new mdc.snackbar.MDCSnackbar(document.querySelector('.mdc-snackbar#failResponse')).open();
});



