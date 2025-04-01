const mongoose = require('mongoose');

// this is schema of the data to be stored as booking 
const bookingSchema = new mongoose.Schema({
  hotelId: { type: String, required: true },
  hotelName: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  guests: { type: Number, required: true },
  status: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  amount: { type: Number, required: true }
});

// this is a function of schema after call this we can create new booking 
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking