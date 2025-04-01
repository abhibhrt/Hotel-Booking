import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from './BookingForm';
import Location from './Location';

const HotelDetail = ({ hotels }) => {
  // Get the hotel ID from the URL parameters
  const { id } = useParams();
  // Hook for navigating between pages
  const navigate = useNavigate();
  // State to manage the visibility of the booking form
  const [showBookingForm, setShowBookingForm] = useState(false);
  // State to manage the visibility of the map component
  const [map, setMap] = useState(false);

  // Find the hotel that matches the provided ID
  const hotel = hotels.find(h => h._id === id);

  // If no hotel is found, display a message
  if (!hotel) return <div>Hotel not found</div>; 

  return (
    <div className="hotel-detail-container">
     {map &&  <Location setMap={setMap} city={hotel.location}/>}
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to Hotels
      </button>
      <div className="hotel-detail-content">
        <div className='image-cont'>
          <img src={hotel.image} alt={hotel.name} className="hotel-image" />
        </div>
        <div className="hotel-info">
          <h1>{hotel.name}</h1>
          <p style={{ color: '#777' }}>{hotel.location} <button className='mapBtn' onClick={() => setMap(true)}>See Map</button></p>
          <div className='rating-badge'>
            <div>
              ★ {hotel.rating}
            </div>
            <span className="hotel-price">
            ₹{hotel.price} <span className="price-per-night">per night</span>
            </span>
          </div>
          <p>{hotel.description}</p>
          <h3>Amenities</h3>
          <ul className="hotel-amenities">
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
