import { useEffect, useState } from "react";
import './filters.css'

const Filters = ({ hotels, setFiltered }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('default');
    const [selectedCity, setSelectedCity] = useState('all');

    const cities = ['all', ...new Set(hotels.map(hotel => hotel.location?.split(',')[0] || ''))];

    useEffect(() => {
        if (!hotels.length) return;

        let filteredHotels = hotels.filter(hotel => {
            const matchesSearch = hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCity = selectedCity === 'all' || hotel.location.startsWith(selectedCity);
            return matchesSearch && matchesCity;
        });

        if (sortOption === 'price-low') filteredHotels.sort((a, b) => a.price - b.price);
        else if (sortOption === 'price-high') filteredHotels.sort((a, b) => b.price - a.price);
        else if (sortOption === 'rating') filteredHotels.sort((a, b) => b.rating - a.rating);

        setFiltered(filteredHotels);
    }, [setFiltered, hotels, searchTerm, sortOption, selectedCity]);

    return (
        <div className="filters-sidebar">
            <h3>Filters</h3>

            <div className="filter-group">
                <label>Search Hotels</label>
                <input
                    type="text"
                    placeholder="Search by name or location"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="filter-input"
                />
            </div>

            <div className="filter-group">
                <label>Filter by City</label>
                <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="filter-select">
                    {cities.map(city => (
                        <option key={city} value={city}>
                            {city === 'all' ? 'All Cities' : city}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label>Sort By</label>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="filter-select">
                    <option value="default">Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Rating</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;