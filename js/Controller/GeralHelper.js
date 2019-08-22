// ------------------------- Geral Helper --------------------------------- //
function validarTipoDeImagem(file) {

    let fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ];
    if(file != null || file !== undefined){
        for(let i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
                return true;
            }
        }
        return false;
    }
    return true;
}
function simNao(bool) {
    if (Boolean((Number(bool)))){
        return 'Sim';
    }else{
        return 'Não';
    }
}
function tratarCategoria(categoria) {
    switch (categoria){
        case '0': return 'Comida';
        case '1': return 'Bebida';
        default: return categoria;
    }
}
function jsonReplacer(key, value){
    // Filtering out properties
    if (typeof value === null) {
        return undefined;
    }
    return value;
}
function isAcceptToText(estadoPedido){
    switch (estadoPedido){
        case null: return {estado: "pendente", corClasse: "black", icon:'', sino: '<i class="material-icons mdc-list-item__meta mdc-theme--on-primary novoPedidoIcone">adjust</i>'} ;
        case 0: return {estado: "negado", corClasse: "black", icon:'close',sino: ''} ;
        //case 1: return {estado: "cancelado", corClasse: "red", icon:'', sino:''} ;
        case 1: return {estado: "em preparo", corClasse: "orange", icon:'store', sino:''} ;
        //case 2: return {estado: "em andamento", corClasse: "", icon:'directions_bike', sino:''} ;
        case 2: return {estado: "pronto", corClasse: "", icon:'room_service', sino:''} ;
        case 3: return {estado: "entregue", corClasse: "green", icon:'done', sino:''} ;
        default: return {estado: "em espera", corClasse: "grey pulse circle", icon:'room_service', sino:''};
    }
}
function formaDePagamento(forma) {
    switch (forma){
        /*case '0': return {estado: "negado", corClasse: "black"} ;
        case '1': return {estado: "cancelado", corClasse: "red"} ;
        case '2': return {estado: "em preparo", corClasse: "orange"} ;
        case '3': return {estado: "em andamento", corClasse: "yellow darken-1"} ;
        case '4': return {estado: "entregue", corClasse: "green"} ;*/
        default: return forma;
    }
}
function PHPdateTime(DatePattern, dataHora = null) {
    let dateTime;
    if (dataHora !== null) {
        if (typeof dataHora === "string") {
            dateTime = new Date(dataHora);
        } else{
            dateTime = dataHora;
        }
    } else {
        dateTime = new Date();
    }
    for (var i = 0; i<=DatePattern.length; i++){
        if(DatePattern.charAt(i)==='d') DatePattern = DatePattern.replace(/d/gi, Number(dateTime.getDate())<10?'0'+(dateTime.getDate()):dateTime.getDate());
        if(DatePattern.charAt(i)==='m') DatePattern = DatePattern.replace(/m/gi, Number(dateTime.getMonth()+1)<10?'0'+(dateTime.getMonth()+1):dateTime.getMonth()+1);
        if(DatePattern.charAt(i)==='Y') DatePattern = DatePattern.replace(/Y/gi, dateTime.getFullYear());
        if(DatePattern.charAt(i)==='i') DatePattern = DatePattern.replace(/i/gi, Number(dateTime.getMinutes())<10?'0'+(dateTime.getMinutes()):dateTime.getMinutes());
        if(DatePattern.charAt(i)==='h') DatePattern = DatePattern.replace(/h/gi, Number(dateTime.getHours())<10?'0'+(dateTime.getHours()):dateTime.getHours());
        if(DatePattern.charAt(i)==='s') DatePattern = DatePattern.replace(/s/gi, Number(dateTime.getSeconds())<10?'0'+(dateTime.getSeconds()):dateTime.getSeconds());
    }
    return DatePattern;
}
function tratarIsAccept(isAccept){
    switch (isAccept){
        case '0': return {estado: "negado", corClasse: "red"} ;
        case null: return {estado: "pendente", corClasse: "yellow darken-1"} ;
        case '1': return {estado: "aceite", corClasse: "orange"} ;
        default: return isAccept;
    }
}
export {validarTipoDeImagem, jsonReplacer, tratarCategoria, isAcceptToText, PHPdateTime, simNao}