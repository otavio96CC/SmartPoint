var mysql = require('mysql');

var conexaoMySQL = function(){
	console.log('Conexao com bd foi estabelecida');
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'vidaloka12',
		database : 'sitema_de_ponto'
	});
}

module.exports = function () {
	console.log('O autoload carregou o módulo de conexão com bd');
	return conexaoMySQL;
}