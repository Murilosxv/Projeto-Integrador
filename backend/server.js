const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const assetRoutes = require('./routes/asset');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Configurações do middleware
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
const mongoURI = 'mongodb+srv://camilgriloramos:activos123@activos.p2xqg.mongodb.net/';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado ao MongoDB com sucesso!');
})
.catch((err) => {
  console.error('Erro ao conectar ao MongoDB:', err);
});

// Usar rotas
app.use('/api/auth', authRoutes);
app.use('/api/assets', assetRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});