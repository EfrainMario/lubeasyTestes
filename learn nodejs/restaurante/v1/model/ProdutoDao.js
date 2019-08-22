class ProdutoDao{

    constructor(){
        this.database = require('../config/DatabaseConfig');
    }

    create(produto, callback){
        produto.id !== undefined ? delete produto.id : produto;
        this.database.query("INSERT INTO produto SET ? ", produto, callback);
    }
    read(produto, callback){
        let finalQuery;

        finalQuery = produto.id !== undefined ? `produto.id = ${Number(produto.id)} AND produto.idRestaurante = ${produto.idRestaurante}`
            : `produto.idRestaurante = ${produto.idRestaurante}`;
        //this.database.query(`SELECT * FROM produto WHERE ${finalQuery} ORDER BY produto.id DESC`, [], callback);
        this.database.query(
            //LEFT OUTER
            {
                sql:`SELECT produto.* ,avaliacao_produto.id FROM produto LEFT OUTER JOIN avaliacao_produto ON avaliacao_produto.idProduto = produto.id  WHERE ${finalQuery} ORDER BY produto.id DESC`,
                nestTables: true
            }, [], callback);
        //this.database.query(`SELECT produto.*, COUNT(avaliacao_produto.id) as avaliacaoTotal FROM produto WHERE ${finalQuery} ORDER BY produto.id DESC`, [], callback);
        //Todo Join
        /*let finalQuery;

        finalQuery = produto.id !== undefined ? `produto.id = ${Number(produto.id)} AND produto.idRestaurante = ${produto.idRestaurante}`
            : `produto.idRestaurante = ${produto.idRestaurante}`;

        */
    }
    update(produto, callback){
        let finalQuery =  `id = ${Number(produto.id)} AND idRestaurante = ${produto.idRestaurante}`;

        produto.dataDeCriacao !== undefined ? delete produto.dataDeCriacao : produto;
        produto.idRestaurante !== undefined ? delete produto.idRestaurante : produto;
        produto.id !== undefined ? delete produto.id : produto;

        this.database.query(`UPDATE produto SET ? WHERE  ${finalQuery}`, [produto], callback);
    }
    delete(produto, callback){
        let finalQuery =  `id = ${Number(produto.id)} AND idRestaurante = ${produto.idRestaurante}`;
        this.database.query(`DELETE FROM produto WHERE ${finalQuery}`, [], callback);
    }

}
module.exports = new ProdutoDao();