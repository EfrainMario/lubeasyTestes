class AvaliacaoRestauranteDao{

    constructor(){
        this.database = require('../config/DatabaseConfig');
    }
    //Todo Inner Join
    read(avaliacaoRestaurante, callback){
        let finalQuery = avaliacaoRestaurante.id !== undefined ? `id = ${Number(avaliacaoRestaurante.id)} AND idRestaurante = ${avaliacaoRestaurante.idRestaurante}`
            : `idRestaurante = ${avaliacaoRestaurante.idRestaurante}`;

        this.database.query(`SELECT * FROM avaliacao_restaurante WHERE ${finalQuery}`, [], callback);
    }
}
module.exports = new AvaliacaoRestauranteDao();