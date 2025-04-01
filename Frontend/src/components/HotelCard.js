import React from 'react';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotels, loading }) => {
  // useNavigate hook to navigate to different routes programmatically
  const navigate = useNavigate();

  return (
    <div className="hotel-listings">
      {/* Display the number of available hotels */}
      <h1>Available Hotels ({hotels.length})</h1>

      {/* Conditional rendering: if there are hotels, map through them, else show loading message */}
      {hotels.length > 0 ? (
        hotels.map((hotel, index) => (
          <div 
            className="hotel-card" 
            key={index} 
            onClick={() => navigate(`/hotel/${hotel._id}`)} // Navigate to hotel detail page on card click
          >
            <div className="hotel-card-header">
              <div>
                {/* Display hotel name and rating */}
                <h3>{hotel.name}</h3>
                <div>Rating <span className="hotel-rating"> ★ {hotel.rating}</span></div>
              </div>
              {/* Display hotel image */}
              <img src={hotel.image} alt={hotel.name} className="hotel-image-small" />
            </div>

            {/* Display hotel location */}
            <p>{hotel.location}</p>

            {/* Display price and per night */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p className="hotel-price">
                ₹{hotel.price} <span className="price-per-night">per night</span>
              </p>
              {/* View Details button */}
              <button className="view-details-btn">
                View Details
              </button>
            </div>
          </div>
        ))
      ) : (
        // If no hotels are available, show the loading message
        <p className="no-results">{loading}</p>
      )}
    </div>
  );
};

export default HotelCard;
