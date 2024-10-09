const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const ObraMateriais = sequelize.define("ObraMateriais", {
    valor: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    nomeMaterial: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dataAlocacao: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    nomeObra: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}
);

module.exports = ObraMateriais;