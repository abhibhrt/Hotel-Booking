import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HotelCard from './components/HotelCard';
import HotelDetail from './components/HotelDetail';
import Filters from './components/Filters';
import ListingForm from './components/ListingForm';
import Bookings from './components/Bookings'
import './App.css';

function App() {
  // State to hold all hotels data fetched from the API
  const [hotels, setHotels] = useState([]);
  
  // State to hold filtered hotels based on filters applied
  const [filteredHotels, setFiltered] = useState([]);
  
  // State to manage whether the ListingForm is visible or not
  const [showListingForm, setShowListingForm] = useState(false);
  
  // State to manage the loading status or messages
  const [loading, setLoading] = useState("Loading Please Wait...");

  // Using useEffect to fetch hotels data when the component mounts
  useEffect(() => {
    async function fetchBookings() {
      try {
        // Fetch hotels data from the API
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hotels`);
        
        // If the response is okay, set the hotels data in state
        if (response.ok) {
          const data = await response.json();
          setHotels(data);
          setLoading('No Data Found'); // Update loading message once data is fetched
        } else {
          // If the response is not okay, log an error and update loading message
          console.log('Failed to load');
          setLoading('Failed to Load Data!');
        }
      } catch (error) {
        // Catch any errors during fetch and log them
        console.error("Error fetching");
      }
    }
    
    // Call the function to fetch data when the component mounts
    fetchBookings();
  }, []); // Empty dependency array means this effect runs only once after mount

  return (
    <Router>
      <div className="App">
        {/* Navbar component with a callback to show the listing form */}
        <Navbar onListHotelClick={() => setShowListingForm(true)} />
        
        <div className="app-container">
          {/* Routes setup to handle different views */}
          <Routes>
            {/* Default route for displaying hotel listings */}
            <Route path="/" element={
              <div className="hotel-listing-container">
                {/* Filters component to filter the hotels */}
                <Filters hotels={hotels} setFiltered={setFiltered} />
                
                {/* HotelCard component to display a list of hotels */}
                <HotelCard hotels={filteredHotels} loading={loading} />
              </div>
            } />
            
            {/* Route for viewing hotel details */}
            <Route path="/hotel/:id" element={<HotelDetail hotels={hotels} />} />
            
            {/* Route for viewing bookings */}
            <Route path='/bookings' element={<Bookings hotels={hotels} />} />
          </Routes>
        </div>
        
        {/* Conditionally render the ListingForm if showListingForm is true */}
        {showListingForm && (
          <ListingForm onClose={() => setShowListingForm(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
