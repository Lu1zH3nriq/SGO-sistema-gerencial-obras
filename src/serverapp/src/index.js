const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 3001;
const usersRoutes = require('./routes/usersRoutes');
const loginRoutes = require('./routes/loginRoutes');
const sequelize = require('./config/config');
const User = require('./models/User');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/users', usersRoutes);
app.use('/api', loginRoutes);


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