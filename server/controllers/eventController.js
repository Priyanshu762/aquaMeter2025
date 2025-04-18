const Event = require('../models/Event');

// Create Event (only NGO or Admin)
exports.createEvent = async (req, res) => {
    try {
        if (req.user.role !== 'ngo' && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
 
        const newEvent = await Event.create({
            ...req.body,
            organizerNgoId: req.user._id
        });

        res.status(201).json({ message: 'Event created', event: newEvent });
    } catch (err) {
        res.status(500).json({ message: 'Error creating event', error: err.message });
    }
};

// Get all events (Admins see all, NGOs see their events, public sees all public ones if needed)
exports.getAllEvents = async (req, res) => {
    try {
        let events;

        if (req.user.role === 'admin') {
            events = await Event.find().populate('organizerNgoId participants');
        } else if (req.user.role === 'ngo') {
            events = await Event.find({ organizerNgoId: req.user._id }).populate('organizerNgoId participants');
        } else {
            // For public users, modify this logic as needed
            events = await Event.find().populate('organizerNgoId');
        }

        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching events', error: err.message });
    }
};

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
