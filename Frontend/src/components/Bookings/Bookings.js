import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './booking.css';
import ListingForm from './ListingForm';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState("Loading Please Wait...");
  const [open, setOpen] = useState(false);

  function onClose(){
    setOpen(!open)
  }

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/booking`);
        
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
          setLoading("No Data is Found!")
        } else {
          setLoading('Failed to fetch bookings')
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  const getBookingStatus = (checkIn, checkOut) => {
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    if (today < checkInDate) return 'Confirmed';
    if (today >= checkInDate && today <= checkOutDate) return 'In Progress';
    return 'Completed';
  };

  return (
    <div className="bookings-page">
      {
        open && <ListingForm onClose={onClose}/>
      }
      <h1>All Bookings</h1>
      <div className="bookings-content">
        {bookings.length > 0 ? (
          <table className="bookings-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Hotel</th>
                <th>Guests</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Status</th>
                <th>Actions</th>
                <th>Gmail</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.hotelName}</td>
                  <td>{booking.guests}</td>
                  <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                  <td>
                    <span className={`booking-status booking-status--${getBookingStatus(booking.checkIn, booking.checkOut).toLowerCase()}`}>
                      {getBookingStatus(booking.checkIn, booking.checkOut)}
                    </span>
                  </td>
                  <td>
                    <Link to={`/hotel/${booking.hotelId}`} className="booking-link">
                      View Hotel
                    </Link>
                  </td>
                  <td>{booking.email}</td>
                  <td>₹{booking.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="bookings-empty">{loading}</p>
        )}
      </div>
      <button className="admin-login-btn" onClick={()=>setOpen(true)} >
        List Hotel
      </button>
    </div>
  );
};

export default Bookings;