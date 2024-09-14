const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Obra = sequelize.define("Obra", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dataFinal: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  orcamento: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  alvara: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsavel: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroContrato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Obra;