const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Cliente = sequelize.define("Cliente", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  tipoPessoa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  razaoSocial: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Cliente;
