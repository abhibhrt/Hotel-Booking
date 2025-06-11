import React from 'react';
import { useNavigate } from 'react-router-dom';
import './card.css';

const HotelCard = ({ hotels, loading }) => {
  const navigate = useNavigate();

  return (
    <div className="hotel-listings">
      <h1 className="hotel-listings-title">Available Hotels ({hotels.length})</h1>

      {hotels.length > 0 ? (
        hotels.map((hotel, index) => (
          <div 
            className="hotel-card" 
            key={index} 
            onClick={() => navigate(`/hotel/${hotel._id}`)}
          >
            <div className="hotel-card-header">
              <div className="hotel-info">
                <h3 className="hotel-name">{hotel.name}</h3>
                <div className="hotel-rating-container">
                  Rating <span className="hotel-rating">★ {hotel.rating}</span>
                </div>
              </div>
              <img src={hotel.image} alt={hotel.name} className="hotel-image" />
            </div>

            <p className="hotel-location">{hotel.location}</p>

            <div className="hotel-footer">
              <p className="hotel-price">
                ₹{hotel.price} <span className="price-per-night">per night</span>
              </p>
              <button className="view-details-btn">
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="no-results">{loading}</p>
      )}
    </div>
  );
};

export default HotelCard;