const express = require('express');
const Asset = require('../models/Asset');
const authMiddleware = require('../middleware/auth');
const router = express.Router();
const QRCode = require('qrcode');

// Obter todos os ativos e contagem
router.get('/', authMiddleware, async (req, res) => {
  try {
    const assets = await Asset.find();
    const totalAssets = assets.length;

    // Contar ativos em manutenção (status 'Inativo')
    const inMaintenance = assets.filter(asset => asset.status === 'Inativo').length;

    res.json({ assets, totalAssets, inMaintenance });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar ativos' });
  }
});


// Criar um novo ativo com QR Code
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    const qrCodeURL = `${process.env.FRONTEND_URL}/detalhes/${newAsset._id}`;
    newAsset.qrCode = await QRCode.toDataURL(qrCodeURL);
    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar ativo' });
  }
});

// Rota para atualizar informações do ativo
router.put('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body; 

  try {
      const updatedAsset = await Asset.findByIdAndUpdate(id, updates, { new: true });
      if (!updatedAsset) {
          return res.status(404).send('Ativo não encontrado');
      }
      res.status(200).json(updatedAsset);
  } catch (error) {
      console.error('Erro ao atualizar o ativo:', error);
      res.status(500).send('Erro ao atualizar o ativo');
  }
});

// Deletar ativo
router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    await Asset.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar ativo' });
  }
});

// Rota para obter os detalhes de um ativo específico pelo ID
router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
      const asset = await Asset.findById(id);
      if (!asset) {
          return res.status(404).json({ message: 'Ativo não encontrado' });
      }
      res.json(asset);
  } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar detalhes do ativo' });
  }
});

module.exports = router;