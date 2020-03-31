let config = require('../config/config');

module.exports = function (aplicacao){

    const env = process.env.NODE_ENV || "development";

    this.config = {
        server: config.server[env],
        database: config.database[env]
       // backup: config.backup[env]
    }

    return this;
}