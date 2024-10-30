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
    const inMaintenance = assets.filter(asset => asset.status === 'maintenance').length;
    res.json({ assets, totalAssets, inMaintenance });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar ativos' });
  }
});

// Criar um novo ativo com QR Code
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newAsset = new Asset(req.body);
    const qrCodeURL = `${process.env.FRONTEND_URL}/detalhes/${newAsset._id}`; // Gera o link para o QR Code
    newAsset.qrCode = await QRCode.toDataURL(qrCodeURL);
    await newAsset.save();
    res.status(201).json(newAsset);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar ativo' });
  }
});

// Atualizar status do ativo
router.put('/:id/status', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(id, { status }, { new: true });
    res.json(updatedAsset);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar status do ativo' });
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

module.exports = router;
