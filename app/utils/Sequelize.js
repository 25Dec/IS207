const Databases = require('../config/Database');
const Sequelize = require('sequelize');

const MySQLSequelize = new Sequelize(
    Databases[0].database,
    Databases[0].username,
    Databases[0].password,{
        host: Databases[0].host,
        port: Databases[0].port,
        dialect: Databases[0].dialect,
        logging: false
    }
);

module.exports = MySQLSequelize;