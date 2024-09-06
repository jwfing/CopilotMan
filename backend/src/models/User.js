const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  corporateEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  githubUsername: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  githubEmail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isInvited: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;