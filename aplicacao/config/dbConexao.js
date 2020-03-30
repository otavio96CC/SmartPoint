var mysql = require('mysql');
// let Sequelize = require('sequelize');

// let sequelize = new Sequelize(
// 	'sitema_de_ponto', 
// 	'root',
// 	'vidaloka12',
// 	{
// 		host : 'localhost',
// 		dialect: 'mysql'
// 	}
// );
// sequelize.authenticate().then(()=>{
// 	console.log("Conexao com o banco de dados feita com sucesso!");
// }).catch((erro)=>{
// 	console.log("Falha ao se conectar ao banco: "+erro);
// });
let db;

let conexaoMySQL = function(){

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
	//return sequelize;
}