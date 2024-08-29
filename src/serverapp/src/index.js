const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes');
const sequelize = require('./config/config'); // Atualize o caminho para refletir a estrutura correta
const User = require('./models/User');

app.use(express.json());
app.use('/', routes);

sequelize.sync()
  .then(() => {
    console.log('Modelos sincronizados com sucesso.');
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Erro ao sincronizar os modelos:', err);
  });