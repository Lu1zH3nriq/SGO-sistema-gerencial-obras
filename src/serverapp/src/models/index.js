const sequelize = require("../config/config");
const User = require("./User");
const Obra = require("./Obra");
const Cliente = require("./Cliente");
const Funcionario = require("./Funcionario");
const Material = require("./Material");
const Equipamento = require("./Equipamento");
const ObraMateriais = require("./ObraMateriais");

// Relacionamentos
Cliente.hasMany(Obra, { foreignKey: "clienteId" });
Obra.belongsTo(Cliente, { foreignKey: "clienteId" });

Obra.hasMany(Funcionario, { foreignKey: "obraId" });
Funcionario.belongsTo(Obra, { foreignKey: "obraId" });

Obra.belongsToMany(Material, { through: ObraMateriais, as: 'materiais' });
Material.belongsToMany(Obra, { through: ObraMateriais, as: 'obras' });

Obra.hasMany(Equipamento, { foreignKey: "obraId" });
Equipamento.belongsTo(Obra, { foreignKey: "obraId" });

Funcionario.hasMany(Equipamento, { foreignKey: "funcionarioId" });
Equipamento.belongsTo(Funcionario, { foreignKey: "funcionarioId" });

module.exports = {
  sequelize,
  User,
  Obra,
  Cliente,
  Funcionario,
  Material,
  Equipamento,
  ObraMateriais,
};
