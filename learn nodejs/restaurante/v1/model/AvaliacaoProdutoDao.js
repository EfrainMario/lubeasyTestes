class AvaliacaoProdutoDao{

    constructor(){
        this.database = require('../config/DatabaseConfig');
    }
    //Todo Inner Join
    read(avaliacaoProduto, callback){
        let finalQuery = avaliacaoProduto.id !== undefined ? `id = ${Number(avaliacaoProduto.id)} AND idRestaurante = ${avaliacaoProduto.idRestaurante}`
            : `idRestaurante = ${avaliacaoProduto.idRestaurante} AND idProduto = ${avaliacaoProduto.idProduto}`;

        this.database.query(`SELECT * FROM avaliacao_produto WHERE ${finalQuery}`, [], callback);
    }
}
module.exports = new AvaliacaoProdutoDao();