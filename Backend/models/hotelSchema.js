const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: {type: String, required: true,},
  location: {type: String, required: true,},
  price: { type: String, required: true,},
  rating: {type: String, required: true, min: 0,max: 5,},
  description: {type: String},
  amenities: {type: String},
  image: {type: String, required: true,},
});

const Hotel = mongoose.model('Hotel', HotelSchema);

module.exports = Hotel;