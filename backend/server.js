const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const bookingRoutes = require('./routes/bookingRoutes'); // Import booking routes
const AdminRoutes=require('./routes/AdminRoutes')
const vehicleRoutes = require('./routes/vehicleRoutes')
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Define routes
app.use('/api/auth', userRoutes); // User authentication routes
app.use('/api/driver', driverRoutes); // Driver-related routes
app.use('/api/bookings', bookingRoutes); // Booking routes
app.use('/api/admin',AdminRoutes);
app.use('/api/vehicles', vehicleRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
