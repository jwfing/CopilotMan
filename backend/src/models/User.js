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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,  // 这将自动设置为创建记录时的时间
  }
}, {
  timestamps: true,  // 这将自动添加 createdAt 和 updatedAt 字段
});

module.exports = User;