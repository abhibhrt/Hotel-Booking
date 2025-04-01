const express = require('express');
const router = express.Router();
const Booking = require("../models/bookingSchema")


//this router will be send used to create new booking
router.post("/", async (req, res) => {
  try {
    // this will extract data from send by UI as a request 
    const { hotelId, hotelName, name, email, checkIn, checkOut, guests, status, amount } = req.body;

    // this will create new booking
    const newBooking = new Booking({
      hotelId,
      hotelName,
      name,
      email,
      checkIn,
      checkOut,
      guests,
      status,
      amount
    });

    //this will Save booking to mongoDB
    const savedBooking = await newBooking.save();
    
    res.status(201).json({
      message: 'Booking created successfully',
      booking: savedBooking
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router