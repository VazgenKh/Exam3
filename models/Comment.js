const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Comment = sequelize.define('Comment', {
    postId: { type: DataTypes.INTEGER, allowNull: false },
    commentMessage: { type: DataTypes.TEXT, allowNull: false }
});

module.exports = Comment;
