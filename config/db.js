const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = sequelize;
