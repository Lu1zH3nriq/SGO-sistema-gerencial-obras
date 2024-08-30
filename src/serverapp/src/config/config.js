const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const caCertPath = path.join(__dirname, '..', 'database', 'DigiCertGlobalRootCA.crt.pem');


const sequelize = new Sequelize(process.env.NAME_DB_LOCAL, process.env.USER_DB_LOCAL, process.env.PASS_DB_LOCAL, {
  host: process.env.URL_HOST_DB_LOCAL,
  dialect: 'mysql',
  port: process.env.PORT_DB_LOCAL,
  // dialectOptions: {
  //   ssl: {
  //     ca: fs.readFileSync(caCertPath)
  //   }
  // }
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;