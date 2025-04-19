const Event = require('../models/Event');

// Create Event (only NGO or Admin)
const { uploadToCloudinary } = require('../utils/uploadToCloudinary');
const fs = require('fs');

exports.createEvent = async (req, res) => {
    try {
        if (req.user.role !== 'ngo' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const {
            name, description, date, time,
            location, participantsLimit
        } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const result = await uploadToCloudinary(req.file.path);

        // Optional: remove local file after upload
        fs.unlinkSync(req.file.path);

        const newEvent = await Event.create({
            name,
            description,
            date,
            time,
            location,
            participantsLimit,
            image: result.secure_url, // URL from Cloudinary
            organizerNgoId: req.user._id,
        });

        res.status(201).json({ message: "Event created", event: newEvent });

    } catch (err) {
        res.status(500).json({ message: "Error creating event", error: err.message });
    }
};


// Get all events (Admins see all, NGOs see their events, public sees all public ones if needed)
exports.getAllEvents = async (req, res) => {
    try {
        let events;
        const selectFields = "name date time description location image";
        events = await Event.find().select(selectFields)
        let upcomingEvents = await Event.find({ date: { $gte: new Date() } }).select(selectFields);
        let pastEvents = await Event.find({ date: { $lt: new Date() } }).select(selectFields);
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err.message });
    }
};

exports.getAllUpcomingEvents = async (req, res) => {
    try {
        const selectFields = "name date time description location image";
        const events = await Event.find({ date: { $gte: new Date() } }).select(selectFields);
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err.message });
    }
};
exports.getAllPastEvents = async (req, res) => {
    try {
        const selectFields = "name date time description location image";
        const event = await Event.find({ date: { $lt: new Date() } }).select(selectFields);
        res.status(200).json(event);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: err.message });

    }
}



// Get single event
exports.getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate('organizerNgoId participants');
        if (!event) return res.status(404).json({ message: 'Event not found' });

        res.json(event);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching event', error: err.message });
    }
};

// Update Event (only creator NGO or admin)
exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        // Access control
        if (
            req.user.role !== 'admin' &&
            String(event.organizerNgoId) !== String(req.user._id)
        ) {
            return res.status(403).json({ message: 'Not authorized to update this event' });
        }

        Object.assign(event, req.body);
        await event.save();

        res.json({ message: 'Event updated', event });
    } catch (err) {
        res.status(500).json({ message: 'Error updating event', error: err.message });
    }
};

// Delete Event (only creator NGO or admin)
exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: 'Event not found' });

        if (
            req.user.role !== 'admin' &&
            String(event.organizerNgoId) !== String(req.user._id)
        ) {
            return res.status(403).json({ message: 'Not authorized to delete this event' });
        }

        await event.remove();

        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting event', error: err.message });
    }
};
