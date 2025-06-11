import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Admin password (you can change this to something more secure)
  const ADMIN_PASSWORD = "bharti";

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      navigate('/control');
      setShowAdminLogin(false);
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div className="home-container">
      {/* Header */}
      <header className="main-header">
        <div className="header-content">
          <h1 className="logo" onClick={() => navigate('/')}>Hotel Booking</h1>
          <nav className="main-nav">
            <button onClick={() => navigate('/hotels')}>Find Hotels</button>
            <button onClick={() => navigate('/contact')}>Contact</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Find Your Perfect Stay</h1>
          <p className="hero-subtitle">Discover amazing hotels at unbeatable prices</p>
          
          <div className="cta-buttons">
            <button className="cta-button primary" onClick={() => navigate('/hotels')}>
              Find Hotels
            </button>
            <button className="cta-button secondary" onClick={() => navigate('/')}>
              View Special Deals
            </button>
          </div>
        </div>
      </section>
      <button className="admin-login-btn" onClick={() => setShowAdminLogin(true)}>
        Admin Login
      </button>
      {showAdminLogin && (
        <div className="admin-login-popup">
          <div className="admin-login-content">
            <h3>Admin Login</h3>
            <form onSubmit={handleAdminLogin}>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <div className="form-buttons">
                <button type="submit" className="login-btn">
                  Login
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => {
                    setShowAdminLogin(false);
                    setError('');
                    setPassword('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏨</div>
            <h3>Wide Selection</h3>
            <p>Thousands of hotels worldwide to choose from</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>We guarantee the lowest rates for your stay</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⭐</div>
            <h3>Verified Reviews</h3>
            <p>Real reviews from real guests</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Providing exceptional hotel booking services since 2010.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => navigate('/hotels')}>Find Hotels</button></li>
              <li><button onClick={() => navigate('/contact')}>Contact Us</button></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>info@hotelbooking.com</p>
            <p>+1 (123) 456-7890</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Hotel Booking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;