let SequelizeAuto = require('sequelize-auto');
let config = require('./config');
let database = config().config.database;


const env = process.env.NODE_ENV || 'development';

const auto = new SequelizeAuto(database.database, database.username, database.password, {
	camelCaseForFileName: true,
	dialect: database.dialect,
	directory: './app/modelos/models'
});

auto.run(function (err) {
	if (err) {
		throw err;
	}

	console.log('---------------- DB TO MODEL ----------------');
	console.log(`BASE: ${database.database}`);
	console.log(`ENV: ${env}`);
	console.log('------------------ SUCESS ------------------');

});

