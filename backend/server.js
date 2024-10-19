const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Configurações do middleware
app.use(cors());
app.use(express.json()); // Para interpretar JSON no corpo das requisições

// Conectar ao MongoDB
const mongoURI = 'mongodb+srv://camilgriloramos:activos123@activos.p2xqg.mongodb.net/'; // Insira suas credenciais aqui
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

// Definindo um esquema e modelo
const assetSchema = new mongoose.Schema({
  name: String,
  acquisitionDate: String,
  cost: Number,
  lifeExpectancy: Number,
});

const Asset = mongoose.model('Asset', assetSchema);

// Rotas
app.get('/api/assets', async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
});

app.post('/api/assets', async (req, res) => {
  const newAsset = new Asset(req.body);
  await newAsset.save();
  res.status(201).json(newAsset);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
