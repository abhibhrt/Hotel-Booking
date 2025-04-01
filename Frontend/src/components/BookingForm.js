import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ hotel, onClose }) => {
  // State for form data with default values
  const [formData, setFormData] = useState({
    hotelId: hotel._id,
    hotelName: hotel.name,
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    amount: 0,
    status: 'confirmed',
    bookingDate: new Date().toISOString().split('T')[0]
  });

  // State for loading, error and success messages
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Calculate total price based on selected dates
  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.round((checkOutDate - checkInDate) / oneDay);

    return nights > 0 ? nights * hotel.price : 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const amount = calculateTotalPrice();

      if (amount <= 0) {
        setError("Check-out date must be after check-in date.");
        setLoading(false);
        return;
      }

      const bookingPayload = {
        ...formData,
        amount
      };

      // API call to submit booking
      await axios.post(`${process.env.REACT_APP_API_URL}/booking`, bookingPayload);
      setSuccess(true)
      setTimeout(onClose, 2000);

    } catch (err) {
      console.error('Booking failed:', err);
      setError(err.response?.data?.message || 'Failed to make booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-modal">
      {/* Success animation */}
      {success && <div className="success-animation">
        <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
        <h1>Booked Successfully!</h1>
      </div>}
      
      {/* Booking form */}
      <div className="booking-form-container">
        <h2>Book {hotel.name}</h2>
        <p>Price per night: ₹{hotel.price}</p>
        
        {/* Error message display */}
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          {/* Name input */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Email input */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {/* Date inputs */}
          <div className="date-inputs">
            <div className="date-input-group">
              <label className="form-label">Check-in</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
                className="form-input"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="date-input-group">
              <label className="form-label">Check-out</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
                className="form-input"
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Guests selector */}
          <div className="form-group">
            <label className="form-label">Number of Guests</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="form-input"
              required
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {/* Price display */}
          <div className="price-preview">
            <h4>Estimated Total: ₹{calculateTotalPrice()}</h4>
          </div>

          {/* Form buttons */}
          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="confirm-btn"
              disabled={loading || !formData.checkIn || !formData.checkOut}
            >
              {loading ? 'Processing...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;