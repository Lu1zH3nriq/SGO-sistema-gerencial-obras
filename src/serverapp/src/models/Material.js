const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Material = sequelize.define("Material", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  principalFornecedor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  unidadeMedida: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataUltimaCompra: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dataValidade: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  numeroNotaFiscal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Material;