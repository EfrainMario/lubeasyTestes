class Servidor{
    constructor(){
        //this.host='http://www.lubeasyapi.com/loja/v1';
        //this.host='https://apiloja.herokuapp.com';
        this.host = 'http://localhost:6001/v1';
    }
    requisitar(metodo, router, dados, loading, success, failure, sempre, comImagem = false){
        return $.ajax(
            {
                crossDomain: true,
                xhrFields :  {
                    withCredentials :  true
                },

                headers:{
                    'x-access-token': sessionStorage.token,
                    },
                method: metodo,
                url:this.host+router,
                data: dados,
                contentType: comImagem === true? false: "application/json",
                processData: false,
                beforeSend: loading(),
                statusCode: {
                    200:function (data, textStatus, xhr){
                        success(data, textStatus, xhr);
                    },
                    201:function (data, textStatus, xhr){
                        success(data, textStatus, xhr);
                    },
                    204:function (data, textStatus, xhr){
                        success(data, textStatus, xhr);
                    }
                }
            })
            .fail(function() {
                failure();
            })
            .always(function() {
                sempre();
            });

    }
}
export {Servidor}

    /*return requisitar(metodo, router, dados, loading, success, failure, sempre, comImagem = false){
        console.log('comImagem: ', comImagem);
        return fetch(this.host+router+"/1", {
            //cache: "no-cache",
            mode: "cors",
            credentials: "include",
            method: metodo,
            referrerPolicy:"origin-when-cross-origin",
            //headers: {
                'Access-Control-Allow-Origin': 'http://www.lubeasyapi.com',
                //'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Origin, Authorization',
                //'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
                //'X-PINGOTHER': 'pingpong',
                //'contentType': "application/json"
            //},
            //redirect: "follow",
            referrer: "origin"
        })
            .then(function(response, request) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(JSON.stringify(myJson));
            });

    }*/
