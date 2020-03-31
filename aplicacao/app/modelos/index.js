const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

let db = null;

module.exports = function(aplicacao){
    if(!db){
        
        db = {};
        let config = aplicacao.util.config.config.database;
        
        const sequelize = new Sequelize(config.database, config.username, config.password, {
            host: config.host,
            dialect: config.dialect,
            logging: config.logging,
            pool: config.pool
        });
        
        let teste = fs.readdirSync(__dirname + '/models')
        .forEach((file) => {

            const model = sequelize.import(path.join(__dirname + '/models', file));

            let objetoProps = {};

            Object.keys(model.tableAttributes).forEach(item=>{
                objetoProps[item] = {
                    values: model.tableAttributes[item].values ? model.tableAttributes[item].values : [],
                    allowNull: model.tableAttributes[item].allowNull ? model.tableAttributes[item].allowNull : false,
                    primaryKey: model.tableAttributes[item].primaryKey ? model.tableAttributes[item].primaryKey : false,
                    autoIncrement: model.tableAttributes[item].autoIncrement ? model.tableAttributes[item].autoIncrement : false,
                    defaultValue: model.tableAttributes[item].defaultValue
                };
            });

            model.objetoProps = objetoProps;

            db[file.split('.')[0]] = model;

        });

        db.sequelize = sequelize;

    }
    this.db = db;

    return this;
}