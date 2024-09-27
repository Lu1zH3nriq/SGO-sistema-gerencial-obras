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
  identificador: {
    type: DataTypes.STRING,
    allowNull: true,
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
    allowNull: true,
  },
  contrato: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alvara: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  orcamento: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  responsavelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  responsavel: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  urlContrato: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Obra;