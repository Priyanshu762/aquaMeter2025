    const mongoose = require('mongoose');

    const eventSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        time:{
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        organizerNgoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        participantsLimit: {
            type: Number,
            required: true
        },
        participantsCount: {
            type: Number,
            default: 0
        },
        participants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }, {
        timestamps: true
    });
    const Event = mongoose.model('Event', eventSchema);
    module.exports = Event;