const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema({
  name: String,
  acquisitionDate: String,
  cost: Number,
  lifeExpectancy: Number,
});

module.exports = mongoose.model('Asset', assetSchema);
