const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  category: String,
  houseNumber: String,
  roadArea: String,
  location: {
    lat: Number,
    lng: Number,
  },
});

module.exports = mongoose.model('Address', addressSchema);