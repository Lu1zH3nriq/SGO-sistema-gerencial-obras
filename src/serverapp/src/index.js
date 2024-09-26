const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
const port = 3001;

const usersRoutes = require('./routes/usersRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const funcionariosRoutes = require('./routes/funcionariosRoutes');
const materiaisRoutes = require('./routes/materiaisRoutes');
const equipamentosRoutes = require('./routes/equipamentosRoutes');
const obrasRoutes = require('./routes/obrasRoutes');
const loginRoutes = require('./routes/loginRoutes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', usersRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/funcionarios', funcionariosRoutes);
app.use('/api/materiais', materiaisRoutes);
app.use('/api/equipamentos', equipamentosRoutes);
app.use('/api/obras', obrasRoutes);
app.use('/api', loginRoutes);

app.get('/', (req, res) => {
  res.send('API está rodando!');
});


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





  