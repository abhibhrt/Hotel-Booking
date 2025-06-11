import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelCard from './components/Hotels/HotelCard.js';
import HotelDetail from './components/Hotels/HotelDetail.js';
import Filters from './components/Hotels/Filters.js';
import ListingForm from './components/Bookings/ListingForm.js';
import Bookings from './components/Bookings/Bookings.js';
import Home from './components/Home/Home.js';
import './App.css';

function App() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFiltered] = useState([]);
  const [showListingForm, setShowListingForm] = useState(false);
  const [loading, setLoading] = useState("Loading Please Wait...");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hotels`);
        if (response.ok) {
          const data = await response.json();
          setHotels(data);
          setLoading('No Data Found');
        } else {
          console.log('Failed to load');
          setLoading('Failed to Load Data!');
        }
      } catch (error) {
        console.error("Error fetching");
      }
    }
    fetchBookings();
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="app-container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/hotels" element={
              <div className="hotel-container">
                <Filters hotels={hotels} setFiltered={setFiltered} />
                <HotelCard hotels={filteredHotels} loading={loading} />
              </div>
            } />
            <Route path="/hotel/:id" element={<HotelDetail hotels={hotels} />} />
            <Route path='/control' element={<Bookings hotels={hotels} />} />
          </Routes>
        </div>
        {showListingForm && (
          <ListingForm onClose={() => setShowListingForm(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
