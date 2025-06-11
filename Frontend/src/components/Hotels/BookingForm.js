import React, { useState } from 'react';
import axios from 'axios';
import './book.css';

const BookingForm = ({ hotel, onClose }) => {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;

    const oneDay = 24 * 60 * 60 * 1000;
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.round((checkOutDate - checkInDate) / oneDay);

    return nights > 0 ? nights * hotel.price : 0;
  };

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

      await axios.post(`${process.env.REACT_APP_API_URL}/booking`, bookingPayload);
      setSuccess(true);
      setTimeout(onClose, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to make booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-form-modal">
      {success && <div className="listing-success">
        <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle className="success-circle" cx="26" cy="26" r="25" fill="none" />
          <path className="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <h1>Booked Successfully!</h1>
      </div>}
      <div className="booking-form-wrapper">
        <h2>Book {hotel.name}</h2>
        <p className="booking-price-info">Price per night: ₹{hotel.price}</p>

        {error && <div className="booking-form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="booking-form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="booking-form-dates">
            <div className="booking-form-group">
              <label>Check-in</label>
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="booking-form-group">
              <label>Check-out</label>
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                required
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <div className="booking-form-group">
            <label>Number of Guests</label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div className="booking-form-total">
            <h4>Estimated Total: ₹{calculateTotalPrice()}</h4>
          </div>

          <div className="booking-form-buttons">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
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