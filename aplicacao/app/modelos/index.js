const Sequelize = require('sequelize');

let db = null;

module.exports = function(aplicacao){
    if(!db){
        
        db = {};
        let config = aplicacao.util.config.config;
        console.log(config);
        const sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: config.dialect,
            operatorsAliases: config.operatorsAliases,
            logging: config.logging,
            pool: config.pool
        });

        db.sequelize = sequelize;

    }
    this.db = db;

    return this;
}