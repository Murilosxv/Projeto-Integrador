const express = require('express');
const Asset = require('./models/asset'); // Importa o modelo Asset

const router = express.Router();

// Rotas para ativos
router.get('/', async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
});

router.post('/', async (req, res) => {
  const newAsset = new Asset(req.body);
  await newAsset.save();
  res.status(201).json(newAsset);
});

module.exports = router;
