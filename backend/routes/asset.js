const express = require('express');
const Asset = require('../models/Asset'); // Importa o modelo Asset
const authMiddleware = require('../middleware/auth'); // Importa o middleware de autenticação

const router = express.Router();

// Rotas para ativos protegidas com o middleware de autenticação
router.get('/', authMiddleware, async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
});

router.post('/', authMiddleware, async (req, res) => {
  const newAsset = new Asset(req.body);
  await newAsset.save();
  res.status(201).json(newAsset);
});

module.exports = router;
