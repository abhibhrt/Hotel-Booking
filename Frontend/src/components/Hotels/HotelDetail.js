import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import Location from './Location';
import './details.css';

const HotelDetail = ({ hotels }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [map, setMap] = useState(false);

  const hotel = hotels.find(h => h._id === id);

  if (!hotel) return <div>Hotel not found</div>; 

  return (
    <div className="hotel-detail-container">
      {map && <Location setMap={setMap} city={hotel.location} />}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Hotels
      </button>
      <div className="hotel-detail-content">
        <div className='image-cont'>
          <img src={hotel.image} alt={hotel.name} className="hotel-detail-image" />
        </div>
        <div className="hotel-detail-info">
          <h1>{hotel.name}</h1>
          <p style={{ color: '#777' }}>{hotel.location} <button className='mapBtn' onClick={() => setMap(true)}>See Map</button></p>
          <div className='rating-badge'>
            <div>
              ★ {hotel.rating}
            </div>
            <span className="hotel-detail-price">
              ₹{hotel.price} <span className="price-per-night">per night</span>
            </span>
          </div>
          <p>{hotel.description}</p>
          <h3>Amenities</h3>
          <ul className="hotel-detail-amenities">
            {hotel.amenities}
          </ul>
        </div>
      </div>
      <button className="book-now-btn" onClick={() => setShowBookingForm(true)}>
        Book Now
      </button>
      {showBookingForm && (
        <BookingForm
          hotel={hotel}
          onClose={() => setShowBookingForm(false)}
        />
      )}
    </div>
  );
};

export default HotelDetail;
