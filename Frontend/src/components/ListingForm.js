import React, { useState } from 'react';
import axios from 'axios';

const ListingForm = ({ onClose }) => {
    // state for storing form data, like hotel name, location, etc.
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        price: '',
        rating: '',
        description: '',
        amenities: [],
        image: ''
    });
    
    // state to show loading when form is being submitted
    const [loading, setLoading] = useState(false);
    
    // store any error messages in case form fails
    const [error, setError] = useState(null);
    
    // show success message when form submission is done
    const [success, setSuccess] = useState(false);

    // function for handling user input changes in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // function for submitting the form data to API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            // sending the hotel data to backend for listing
            await axios.post(`${process.env.REACT_APP_API_URL}/hotel`, formData);
            setSuccess(true);
            setTimeout(onClose, 2000); // close form after 2 sec
        } catch (error) {
            // if request fails, show error message
            setError("Failed to list hotel. Please try again.");
        } finally {
            setLoading(false); // stop loading state when done
        }
    };

    return (
        <div className="booking-modal">
            {success && <div className="success-animation">
                <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" /><path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" /></svg>
                <h1>Listed Successfully!</h1>
            </div>}
            <div className="booking-form-container">
                <h2>List New Hotel</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Hotel Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Location (City)</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required className="form-input" />
                    </div>

                    <div className="date-inputs">
                        <div className="date-input-group">
                            <label className="form-label">Price per night (₹)</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="form-input" min="1" />
                        </div>
                        <div className="date-input-group">
                            <label className="form-label">Rating (1-5)</label>
                            <input type="number" name="rating" value={formData.rating} onChange={handleChange} required className="form-input" min="1" max="5" step="0.1" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required className="form-input" rows="3" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Amenities (comma separated)</label>
                        <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} required className="form-input" placeholder="Free WiFi, Swimming Pool, Spa" />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Image URL</label>
                        <input type="url" name="image" value={formData.image} onChange={handleChange} required className="form-input" placeholder="https://example.com/hotel.jpg" />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn" disabled={loading}>Cancel</button>
                        <button type="submit" className="confirm-btn" disabled={loading}>{loading ? 'Processing...' : 'List Hotel'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ListingForm;
