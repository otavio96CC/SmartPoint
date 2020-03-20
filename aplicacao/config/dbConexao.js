var mysql = require('mysql');

let db;

var conexaoMySQL = function(){

	if(db){
		return db;
	}

	console.log('Conexao com bd foi estabelecida');
	db = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'vidaloka12',
		database : 'sitema_de_ponto'
	});

	return db
}

module.exports = function () {
	console.log('O autoload carregou o módulo de conexão com bd');
	return conexaoMySQL;
}