const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/config'); // Atualize o caminho para refletir a estrutura correta

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  // Outras opções do modelo
});

module.exports = User;