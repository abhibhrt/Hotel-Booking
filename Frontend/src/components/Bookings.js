import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Bookings = () => {
  // State to store all the booking data we fetch from the API
  const [bookings, setBookings] = useState([]);
  // State to handle loading messages or errors for the user
  const [loading, setLoading] = useState("Loading Please Wait...");

  // This useEffect runs once when the component loads to fetch booking data
  useEffect(() => {
    // Define an async function inside useEffect to fetch data
    async function fetchBookings() {
      try {
        // Make a GET request to our booking API endpoint
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/booking`);
        
        // If the response is successful (status code 200-299)
        if (response.ok) {
          // Parse the JSON data from the response
          const data = await response.json();
          // Store the booking data in state
          setBookings(data);
          // Update loading message in case there's no data
          setLoading("No Data is Found!")
        } else {
          // If response isn't successful, show error message
          setLoading('Failed to fetch bookings')
        }
      } catch (error) {
        // Catch any network errors and log them
        console.error("Error fetching bookings:", error);
      }
    }
    // Call the fetch function we defined
    fetchBookings();
  }, []); // Empty dependency array means this runs only once on mount
  

  // Helper function to determine booking status based on dates
  const getBookingStatus = (checkIn, checkOut) => {
    const today = new Date();
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // If today is before check-in date, booking is confirmed
    if (today < checkInDate) return 'Confirmed';
    // If today is between check-in and check-out, it's in progress
    if (today >= checkInDate && today <= checkOutDate) return 'In Progress';
    // Otherwise, the booking is completed
    return 'Completed';
  };

  // The actual component rendering
  return (
    <div className="bookings-container">
      <h1>All Bookings</h1>
      <div className="bookings-list">
        {/* Check if we have bookings to display */}
        {bookings.length > 0 ? (
          // If we have bookings, render them in a table
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
              {/* Map through each booking and create a table row */}
              {bookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.name}</td>
                  <td>{booking.hotelName}</td>
                  <td>{booking.guests}</td>
                  {/* Format dates to be more readable */}
                  <td>{new Date(booking.checkIn).toLocaleDateString()}</td>
                  <td>{new Date(booking.checkOut).toLocaleDateString()}</td>
                  <td>
                    {/* Add CSS class based on status for styling */}
                    <span className={`status-badge ${getBookingStatus(booking.checkIn, booking.checkOut).toLowerCase()}`}>
                      {getBookingStatus(booking.checkIn, booking.checkOut)}
                    </span>
                  </td>
                  <td>
                    {/* Link to view the hotel details */}
                    <Link to={`/hotel/${booking.hotelId}`} className="view-hotel-btn">
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
          // If no bookings, show the loading/error message
          <p className="no-bookings">{loading}</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;