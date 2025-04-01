const express = require('express');
const router = express.Router();
const Hotel = require("../models/hotelSchema");

// Route to add a new hotel
router.post("/", async (req, res) => {
  try {
    // Extracting data from request body
    const { name, location, price, rating, description, amenities, image } = req.body;

    // Creating new hotel entry
    const newHotel = new Hotel({
      name,
      location,
      price,
      rating,
      description,
      amenities,
      image
    });

    // Saving the hotel to MongoDB
    const savedHotel = await newHotel.save();

    res.status(201).json({
      message: 'Hotel added successfully',
      hotel: savedHotel
    });

  } catch (error) {
    console.error('Hotel creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
