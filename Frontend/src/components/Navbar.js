import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onListHotelClick }) => {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">
        Hotel Booking
      </h1>
      <div>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/bookings" className="nav-link">Bookings</Link>
        <button 
          onClick={onListHotelClick}
          className="nav-link list-hotel-btn">
          List Hotel
        </button>
      </div>
    </nav>
  );
};

export default Navbar;