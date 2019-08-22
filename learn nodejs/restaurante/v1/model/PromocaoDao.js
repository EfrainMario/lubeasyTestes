class PromocaoDao{

    constructor(){
        this.database = require('../config/DatabaseConfig');
    }

    create(promocao, callback){
        promocao.id !== undefined ? delete promocao.id : promocao;
        this.database.query("INSERT INTO promocao SET ? ", promocao, callback);
    }
    read(promocao, callback){

        let finalQuery;

        finalQuery = promocao.id !== undefined ? `id = ${Number(promocao.id)} AND idRestaurante = ${promocao.idRestaurante}`
            : `idRestaurante = ${promocao.idRestaurante}`;
        this.database.query(`SELECT * FROM promocao WHERE ${finalQuery} ORDER BY promocao.id DESC`, [], callback);
    }
    update(promocao, callback){
        let finalQuery;

        finalQuery = `id = ${Number(promocao.id)} AND idRestaurante = ${promocao.idRestaurante}`;

        promocao.dataDeCriacao !== undefined ? delete promocao.dataDeCriacao : promocao;
        promocao.idRestaurante !== undefined ? delete promocao.idRestaurante : promocao;
        promocao.id !== undefined ? delete promocao.id : promocao;

        this.database.query(`UPDATE promocao SET ? WHERE ${finalQuery}`, [promocao], callback);
    }
    delete(promocao, callback){
        let finalQuery;

        finalQuery = promocao.id !== undefined ? `id = ${Number(promocao.id)} AND idRestaurante = ${promocao.idRestaurante}`
            : `idRestaurante = ${promocao.idRestaurante}`;

        this.database.query(`DELETE FROM promocao WHERE ${finalQuery}`, [], callback);
    }

}
module.exports = new PromocaoDao();