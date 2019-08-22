window.name= "lubeasy";
if (sessionStorage.token==null){
    //let params = new URLSearchParams(document.location.search.substring(1));
    let params = (new URL(document.location)).searchParams;
    let pagina = params.get("action");


    location.replace(`login.html${pagina===null?'':`?nextpage=${pagina}`}`);
}
