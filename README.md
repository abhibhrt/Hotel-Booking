# Hotel Management System

A full-stack web application for hotel bookings and management built with React (frontend) and Node.js (backend).

## Features

- **User Bookings**: Guests can book hotels with check-in/check-out dates
- **Hotel Listings**: Add and manage new hotels in the system
- **Smart Filtering**: Find hotels by:
  - City/location
  - Hotel name
  - Price range
  - Rating

## Setup Instructions

### Backend Setup
1. Navigate to backend directory by give command 'cd Backend'
2. Install all the dependecies by running command 'npm install' through the terminal
3. Run `nodemon server.js` to start the Node.js server

### Frontend Setup
1. Navigate to frontend directory by give command 'cd Frontend'
2. Install all the dependecies by running command 'npm install' through the terminal
3. Configure `.env` file:
   - For local development: Set `REACT_APP_API_URL` to your local backend (e.g., `http://localhost:5000`)
   - For production: Set to your live backend API URL
4. Run `npm start` to launch the React application

## System Architecture

**Frontend**:
- React.js
- Context API for state management
- Responsive UI components

**Backend**:
- Node.js with Express
- RESTful API endpoints
- MongoDB for data storage

## Usage

1. Browse available hotels with filters
2. Select dates and book your stay
3. Manage your bookings in the dashboard
4. Add new hotels