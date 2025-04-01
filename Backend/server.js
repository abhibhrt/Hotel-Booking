const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookingRouter = require('./routes/bookingRouter');
const Booking = require('./models/bookingSchema');
const hotelRouter = require('./routes/hotelRouter');
const Hotel = require('./models/hotelSchema');
require('dotenv').config();
const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

//this function connects database with server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));


// this program handles new Booking
app.use('/booking', bookingRouter);
app.use('/hotel', hotelRouter);

// this program handels send data in json format
app.use("/api/booking", (req, res) => {
  Booking.find({})
    .then((response) => {
      res.json(response);
    })
    .catch(err => console.error(err));
})
app.use("/api/hotels", (req, res) => {
  Hotel.find({})
    .then((response) => {
      res.json(response);
    })
    .catch(err => console.error(err));
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));