class RestauranteDao{

    constructor(){
        this.database = require('../config/DatabaseConfig');
    }

    create(conta, callback){
        this.database.query("INSERT INTO restaurante SET ? ", conta, callback);
    }
    login(credenciais, callback){
        this.database.query("SELECT * FROM restaurante WHERE email = ? AND senha = ? ", [credenciais.email, credenciais.senha], callback);
    }
    read(restaurante, callback){
        this.database.query("SELECT * FROM restaurante WHERE ?", restaurante,
            function(err, result, fields){
            if(result[0].senha) delete result[0].senha;
            callback(err,result);
        });
    }
    getRestauranteFCMTokenByIdRestaurante(idRestaurante,callback){
        this.database.query("SELECT fcmToken FROM restaurante WHERE id = ?", [idRestaurante], callback);
    }
    AccountExists(restaurante, callback){
        this.database.query("SELECT id FROM restaurante WHERE email = ? OR telefone = ?", [restaurante.email, restaurante.telefone], callback);
    }
    update(restaurante, callback){
        restaurante.email !== undefined ? delete restaurante.email : restaurante;
        restaurante.dataDeCriacao !== undefined ? delete restaurante.dataDeCriacao : restaurante;
        let id = restaurante.id;
        delete restaurante.id;

        this.database.query("UPDATE restaurante SET ? WHERE id = ?", [restaurante , id], callback);
    }

}

module.exports = new RestauranteDao();