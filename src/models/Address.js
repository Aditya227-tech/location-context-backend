const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fullAddress: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  houseNumber: String,
  apartmentRoad: String,
  addressType: {
    type: String,
    enum: ['Home', 'Office', 'Friends & Family']
  }
}, { timestamps: true });

module.exports = mongoose.model('Address', AddressSchema);