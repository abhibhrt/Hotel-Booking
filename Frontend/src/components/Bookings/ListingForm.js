import React, { useState } from 'react';
import axios from 'axios';
import './list.css';

const ListingForm = ({ onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        rating: '',
        description: '',
        amenities: [],
        image: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/hotel`, formData);
            setSuccess(true);
            setTimeout(onClose, 2000);
        } catch (error) {
            setError("Failed to list hotel. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="listing-modal">
            {success && <div className="listing-success">
                <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="success-circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="success-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                </svg>
                <h1>Listed Successfully!</h1>
            </div>}
            <div className="listing-form-container">
                <h2>List New Hotel</h2>
                {error && <div className="listing-error">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="listing-form-group">
                        <label>Hotel Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="listing-form-group">
                        <label>Location (City)</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
                    </div>

                    <div className="listing-form-row">
                        <div className="listing-form-group">
                            <label>Price per night (₹)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required min="1" />
                        </div>
                        <div className="listing-form-group">
                            <label>Rating (1-5)</label>
                            <input type="number" name="rating" value={formData.rating} onChange={handleChange} required min="1" max="5" step="0.1" />
                        </div>
                    </div>

                    <div className="listing-form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required rows="3" />
                    </div>

                    <div className="listing-form-group">
                        <label>Amenities (comma separated)</label>
                        <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} required placeholder="Free WiFi, Swimming Pool, Spa" />
                    </div>

                    <div className="listing-form-group">
                        <label>Image URL</label>
                        <input type="url" name="image" value={formData.image} onChange={handleChange} required placeholder="https://example.com/hotel.jpg" />
                    </div>

                    <div className="listing-form-actions">
                        <button type="button" onClick={onClose} disabled={loading}>Cancel</button>
                        <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'List Hotel'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ListingForm;