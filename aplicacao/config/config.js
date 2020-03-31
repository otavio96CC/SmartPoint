module.exports = {
	database: {
		development: {
			username: "root",
			password: "vidaloka12",
			database: "sitema_de_ponto",
			host: "127.0.0.1",
			dialect: "mysql",
			operatorsAliases: false,
			logging: false,
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
		},
		test: {
			username: "",
			password: "",
			database: "",
			host: "",
			dialect: "",
			operatorsAliases: false,
			logging: false,
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
		},
		production: {
			username: "",
			password: "",
			database: "",
			host: "",
			dialect: "",
			operatorsAliases: false,
			logging: false,
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
		}
	},
	server: {
		development: {
			secret: 'otavio',
			jwtSecret: 'qpb0jS3uACLE+aGrsJsR4qwG9g5PA1BsDyDvbrr1EKvUdP+xgsALzRdBc641f1GHbObW3xICq34MyHN4DH5OhJZ91wO+2ezUN/MA73pJaSzWzH/B9pozXnnFGVBeE1jVU1fTQ1N5yDiVs3w+HKW5DyK5ICei8EsYfSBndlh30VGFfcssFjJhXvWYETx4luSoZFWIf74QfpLyItxPi8INkFsgtDTXdiYQWeTbsGQE+caF6fVYr42robZx/WaJqpcShw88KCrMQS3gqrgMSwpO10gqwiLpxQAt7wi7zyXcqzm5cWdbm3aDmlvMIaF2Ii3aGy5tNx7wZHBP+TdLO6uATw==',
			url: 'http://127.0.0.1',
			port: '3000',
			nome: 'aplicacao',
		},
		test: {
			secret: '',
			jwtSecret: '',
			url: '',
			port: '',
			nome: '',
		},
		production: {
			secret: '',
			jwtSecret: '',
			url: '',
			port: '',
			nome: '',
		},
	}
	
}