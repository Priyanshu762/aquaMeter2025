const express = require('express');
const router = express.Router();
const {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../utils/multer');

router.post('/', protect,upload.single("image"),createEvent);
router.get('/', protect, getAllEvents);
router.get('/:id', protect, getEventById);
router.put('/:id', protect, updateEvent);
router.delete('/:id', protect, deleteEvent);
//         (req.user.role !== 'ngo' && req.user.role !== 'admin') ||

module.exports = router;
