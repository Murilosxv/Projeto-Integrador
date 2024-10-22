const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;

// Configurações do middleware
app.use(cors());
app.use(express.json()); // Para interpretar JSON no corpo das requisições

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

// Definindo os esquemas e modelos
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const assetSchema = new mongoose.Schema({
  name: String,
  acquisitionDate: String,
  cost: Number,
  lifeExpectancy: Number,
});

const User = mongoose.model('User', userSchema);
const Asset = mongoose.model('Asset', assetSchema);

// Rotas para registro e login
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
});


app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ id: user._id }, 'seu_segredo', { expiresIn: '1h' }); // Use um segredo forte aqui
  res.json({ token });
});

// Rotas para ativos
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