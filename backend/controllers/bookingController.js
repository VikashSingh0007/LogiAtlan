const Booking = require('../models/Booking');

// controllers/bookingController.js

const createBooking = async (req, res) => {
    try {
        const { pickupLocation, dropOffLocation, vehicleType } = req.body; // Use dropOffLocation
        console.log(req.body)
        // Log incoming request body
        // console.log('Incoming booking request:', req.body);
        
        // Ensure the user is authenticated
        if (!req.user ) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Calculate estimated cost based on vehicle type and distance
        const estimatedCost = await calculateEstimatedCost(pickupLocation, dropOffLocation, vehicleType);
        
        if (estimatedCost === null || estimatedCost === undefined) {
            return res.status(400).json({ error: 'Failed to calculate estimated cost' });
        }

        const booking = new Booking({
            userId: req.user.id, // User ID from authenticated request
            pickupLocation,
            dropOffLocation, // Ensure this matches the schema
            vehicleType,
            estimatedCost,
            status: 'active', // Use 'active' as initial booking status
        });

        await booking.save();
        res.status(201).json({ message: 'Booking created successfully', booking });
    } catch (error) {
        console.error('Error creating booking:', error); // Log the error details
        res.status(500).json({ error: 'Failed to create booking', details: error.message });
    }
};


// View user's booking history
const viewBookingHistory = async (req, res) => {
    try {
        // Fetch bookings for the logged-in user and populate both user and driver details
        const bookings = await Booking.find({ userId: req.user.id })
            .populate('userId', 'name email phone') // Populating user details
            .populate('driverId', 'name email phone'); // Populating driver details

        if (bookings.length === 0) {
            return res.status(200).json({ message: 'No bookings found for this user.' });
        }

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error retrieving booking history:', error);
        res.status(500).json({ error: 'Failed to retrieve booking history' });
    }
};



// Cancel a booking
// Cancel a booking
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.bookingId);

        if (!booking || booking.userId.toString() !== req.user.id) {
            return res.status(404).json({ error: 'Booking not found or unauthorized' });
        }

        booking.status = 'canceled'; // Change the status to 'canceled'
        await booking.save();

        res.status(200).json({ message: 'Booking cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
};

// Function to estimate the cost (dummy implementation)
const calculateEstimatedCost = async (pickupLocation, dropoffLocation, vehicleType) => {
    // This is a placeholder. Implement the logic to calculate cost based on distance, vehicle type, etc.
    // You could use an external API to calculate distances and apply pricing rules based on vehicle types.
    return Math.floor(Math.random() * 100) + 1; // Random cost between 1 and 100 for demonstration
};

module.exports = {
    createBooking,
    viewBookingHistory,
    cancelBooking
};
