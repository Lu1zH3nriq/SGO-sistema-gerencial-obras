const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Atualize o caminho do arquivo de certificado CA para refletir o local correto
const caCertPath = path.join(__dirname, '..', 'database', 'DigiCertGlobalRootCA.crt.pem');

const sequelize = new Sequelize('db_teste_connect', 'db_admin', 'adminSGO!', {
  host: 'db-mysql-sgo.mysql.database.azure.com',
  dialect: 'mysql',
  port: 3306,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(caCertPath)
    }
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;