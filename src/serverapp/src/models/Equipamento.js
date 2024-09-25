const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Equipamento = sequelize.define("Equipamento", {
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
    allowNull: false,
  },
  peso: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dataCadastro: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  dataAlocacao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  derivado: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  funcionarioId: { 
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Funcionarios', 
      key: 'id'
    }
  }
});

module.exports = Equipamento;