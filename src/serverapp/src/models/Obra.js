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
  responsavel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Funcionarios', 
      key: 'id'
    }
  }
});

module.exports = Obra;