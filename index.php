<!doctype html>
<html lang="pt-PT" class="mdc-typography">
<script src="js/primario.js"></script>
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Lubeasy</title>
    <style>
        :root{
            --mdc-theme-primary : #fe4600 !important;
            --mdc-theme-secondary : #fe4600 !important;
            --mdc-theme-on-primary : #ff8800 !important;
            --mdc-theme-on-secondary : rgb(255, 80, 0) !important;

            --mdc-theme-background: #000000 !important;
            --mdc-theme-on-surface: #000000 !important;

            --mdc-theme-text-primary-on-light: rgba(255, 80, 0, 0.87) !important;
            --mdc-theme-text-secondary-on-light: rgba(0, 0, 0, 0.87) !important;
            --mdc-theme-text-hint-on-light: rgba(0, 0, 0, 0.87) !important;
            /*--mdc-theme-text-disabled-on-light: !important;
            --mdc-theme-text-icon-on-light: !important;*/

        }


    </style>
    <link rel="stylesheet" href="styles/material-components-web.min.css">
    <link href="styles/estilos.css" rel="stylesheet">
    <style>
        body {
            display: flex;
            min-height: calc(80vh - 64px);
        }
        .mdc-drawer-app-content {
            flex: auto;
            overflow: auto;
            position: relative;
        }
        .main-content {
            overflow: auto;
            height: 100%;
        }
        #app-bar {
            background-color: white;
            position: absolute;
            color: rgba(0,0,0,0.87);
        }
        .mdc-top-app-bar {
            z-index: 7;
        }
    </style>
</head>
<body class="hide">





<header class="mdc-top-app-bar" id="app-bar" style="left: 0;top: 0;">
    <div class="mdc-top-app-bar__row">
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <a href="#!" id="open_drawer" class="demo-menu material-icons mdc-top-app-bar__navigation-icon hide">menu</a>
            <a href="#" id="back_arrow" class="material-icons mdc-top-app-bar__navigation-icon hide">arrow_back</a>
            <span class="mdc-top-app-bar__title">Lubeasy</span>
        </section>
        <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
            <a href="pag/pedidos" id="novoPedido" class="material-icons mdc-top-app-bar__action-item" aria-label="Novo pedido">person_pin
                <span id="pedidoPin" class="hide" style="position: absolute!important;padding: 5px !important;background-color: #0073ff!important;border-radius: 15px!important;"></span>
            </a>
            <a href="pag/notificacoes" id="notificacoes" class="material-icons mdc-top-app-bar__action-item" aria-label="Print this page">notifications</a>
            <div class="mdc-top-app-bar__action-item">
                <div class="mdc-switch " data-mdc-auto-init="MDCSwitch">
                    <div class="mdc-switch__track"></div>
                    <div class="mdc-switch__thumb-underlay">
                        <div class="mdc-switch__thumb">
                            <input type="checkbox" id="online" class="mdc-switch__native-control" role="switch">
                        </div>
                    </div>
                </div>
                <label for="online"></label>
            </div>

        </section>
    </div>
</header>
<aside class="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust">
    <div class="mdc-drawer__header">
        <h3 class="mdc-drawer__title"></h3>
        <h6 class="mdc-drawer__subtitle"></h6>
    </div>
    <div class="mdc-drawer__content">
        <div class="mdc-list">
            <h3 class="mdc-list-group__subheader">Diárias</h3>
            <a class="mdc-list-item  mdc-list-item--activated" href="pag/inicial">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">store</i>
                <span class="mdc-list-item__text">Inicial</span>
            </a>
            <a class="mdc-list-item" href="pag/pedidos" aria-current="page">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">person_pin</i>
                <span class="mdc-list-item__text">Pedidosss</span>
            </a>
            <a class="mdc-list-item" href="pag/produtos">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">fastfood</i>
                <span class="mdc-list-item__text">Produtos</span>
            </a>
            <a class="mdc-list-item" href="pag/promocoes">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">flag</i>
                <span class="mdc-list-item__text">Promoções</span>
            </a>
            <a class="mdc-list-item" href="pag/notificacoes">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">drafts</i>
                <span class="mdc-list-item__text">Notificações</span>
            </a>
            <hr class="mdc-list-divider">
            <h3 class="mdc-list-group__subheader">Gestão</h3>
            <a class="mdc-list-item" href="pag/entregadores">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">people</i>
                <span class="mdc-list-item__text">Entregadores</span>
            </a>
            <a class="mdc-list-item" href="pag/estatisticas">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">trending_up</i>
                <span class="mdc-list-item__text">Estatísticas</span>
            </a>
            <hr class="mdc-list-divider">
            <h3 class="mdc-list-group__subheader">Gerais</h3>
            <a class="mdc-list-item" href="pag/definicoes">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">settings</i>
                <span class="mdc-list-item__text">Definições</span>
            </a>
            <a class="mdc-list-item" href="sair">
                <i class="material-icons mdc-list-item__graphic" aria-hidden="true">clear</i>
                <span class="mdc-list-item__text">Sair</span>
            </a>

        </div>
    </div>
</aside>
​
<div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">

    <div id="pbIndex" role="progressbar" class="mdc-linear-progress mdc-linear-progress--indeterminate mdc-linear-progress--closed hide">
        <div class="mdc-linear-progress__buffering-dots"></div>
        <div class="mdc-linear-progress__buffer"></div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
            <span class="mdc-linear-progress__bar-inner"></span>
        </div>
        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
            <span class="mdc-linear-progress__bar-inner"></span>
        </div>
    </div>

    <main class="main-content hide" id="main-content">


        <!-- Content --->




    </main>
    <div id="failResponse" class="mdc-snackbar">
        <div class="mdc-snackbar__surface">
            <div class="mdc-snackbar__label"
                 role="status"
                 aria-live="polite">
                Problemas com a conexão. Verifique sua a ligação com a internet
            </div>
        </div>
    </div>

    <div id="dialogSair" class="mdc-dialog"
         role="alertdialog"
         aria-modal="true"
         aria-labelledby="my-dialog-title"
         aria-describedby="my-dialog-content">
        <div class="mdc-dialog__container">
            <form id="frmSair">
                <div class="mdc-dialog__surface">
                    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
                    <h2 class="mdc-dialog__title" id="my-dialog-title">Terminar sessão?</h2>
                    <div class="mdc-dialog__content" id="my-dialog-content">
                        Tens a certeza que pretendes terminar sessão? Não vais poder responder aos pedidos dos clientes

                    </div>
                    <div id="pbSair" role="progressbar" class="mdc-linear-progress mdc-linear-progress--indeterminate mdc-linear-progress--closed">
                        <div class="mdc-linear-progress__buffering-dots"></div>
                        <div class="mdc-linear-progress__buffer"></div>
                        <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                            <span class="mdc-linear-progress__bar-inner"></span>
                        </div>
                        <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                            <span class="mdc-linear-progress__bar-inner"></span>
                        </div>
                    </div>
                    <footer class="mdc-dialog__actions">
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                            <span class="mdc-button__label">Não</span>
                        </button>
                        <button type="submit" class="mdc-button mdc-dialog__button"> <!--data-mdc-dialog-action="yes">-->
                            <span class="mdc-button__label">Sim</span>
                        </button>
                    </footer>
                </div>
            </form>
        </div>
        <div class="mdc-dialog__scrim"></div>
    </div>

    <div id="dialogSenha" class="mdc-dialog"
         role="alertdialog"
         aria-modal="true"
         aria-labelledby="my-dialog-title"
         aria-describedby="my-dialog-content">
        <div class="mdc-dialog__container">
            <form id="frmSenha">
                <div class="mdc-dialog__surface">
                    <!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
                    <h2 class="mdc-dialog__title" id="my-dialog-title">Credenciais de acesso</h2>
                    <div class="mdc-dialog__content" id="my-dialog-content">
                        Para prosseguir, tens de inserir as suas credenciais de acesso
                        <div class="mdc-text-field mdc-text-field--with-leading-icon" data-mdc-auto-init="MDCTextField">
                            <i class=" mdc-text-field__icon">*</i>
                            <input id="senhaInserida" required type="password" class="mdc-text-field__input">
                            <div class="mdc-line-ripple"></div>
                            <label for="senhaInserida" class="mdc-floating-label">Senha</label>
                        </div>

                        <div id="pbSenha" role="progressbar" class="mdc-linear-progress mdc-linear-progress--indeterminate mdc-linear-progress--closed">
                            <div class="mdc-linear-progress__buffering-dots"></div>
                            <div class="mdc-linear-progress__buffer"></div>
                            <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
                                <span class="mdc-linear-progress__bar-inner"></span>
                            </div>
                            <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
                                <span class="mdc-linear-progress__bar-inner"></span>
                            </div>
                        </div>
                    </div>

                    <footer class="mdc-dialog__actions">
                        <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
                            <span class="mdc-button__label">cancelar</span>
                        </button>
                        <button type="submit" class="mdc-button mdc-dialog__button"> <!--data-mdc-dialog-action="yes">-->
                            <span class="mdc-button__label">entrar</span>
                        </button>
                    </footer>
                </div>
            </form>
        </div>
        <div class="mdc-dialog__scrim"></div>
    </div>


</div>


<!--
<script src="https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.10.1/firebase-messaging.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.10.1/firebase.js"></script>
-->
<script src="https://www.gstatic.com/firebasejs/6.3.4/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.3.4/firebase-messaging.js"></script>
<script src="https://www.gstatic.com/firebasejs/6.3.4/firebase.js"></script>


<script src="js/material-components-web.min.js"></script>
<script src="js/jquery-3.3.1.min.js"></script>
<script type="module" src="js/index.js"></script>





<script>
    window.mdc.autoInit();
    const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    const topAppBar = mdc.topAppBar.MDCTopAppBar.attachTo(document.getElementById('app-bar'));
    topAppBar.setScrollTarget(document.getElementById('main-content'));
    topAppBar.listen('MDCTopAppBar:nav', () => {
        drawer.open = !drawer.open;
    });
    $('header#app-bar section a').on('click',function (e) {
       e.preventDefault();

    });

</script>









</body>
</html>
