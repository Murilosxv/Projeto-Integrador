const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: String,
  acquisitionDate: String,
  cost: Number,
  lifeExpectancy: Number,
  status: { type: String, default: 'active' }, // Ex: 'active', 'maintenance'
  qrCode: String, // Armazena o URL do QR Code
});

module.exports = mongoose.model('Asset', assetSchema);
