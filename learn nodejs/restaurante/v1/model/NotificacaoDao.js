class NotificacaoDao{

    constructor(){
        this.database = require('../config/DatabaseConfig');
    }
    readList(notificacao, callback){
        let finalQuery = `idRestaurante = ${notificacao.idRestaurante} OR idRestaurante IS NULL`;
        this.database.query(`SELECT titulo, id, dataDeEmissao FROM notificacao WHERE ${finalQuery}`, null,callback);
    }
    readOne(notificacao, callback){
        let finalQuery = `(idRestaurante = ${this.database.escape(notificacao.idRestaurante)} OR idRestaurante IS NULL) AND id = ${this.database.escape(notificacao.id)}`;
        this.database.query(`SELECT * FROM notificacao WHERE  ${finalQuery}`, null, callback);
    }

}

module.exports = new NotificacaoDao();