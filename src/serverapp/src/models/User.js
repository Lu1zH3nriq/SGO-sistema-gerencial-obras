const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Usuario = sequelize.define(
  "Usuario",
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataCadastro: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nivelUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Outras opções do modelo
  }
);

module.exports = Usuario;
