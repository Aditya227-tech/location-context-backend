const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');
const authMiddleware = require('../middleware/auth');

// Apply auth middleware to all address routes
router.use(authMiddleware);

// Create a new address
router.post('/', addressController.createAddress);

// Get all user addresses
router.get('/', addressController.getUserAddresses);

// Update an existing address
router.put('/:id', addressController.updateAddress);

// Delete an address
router.delete('/:id', addressController.deleteAddress);

module.exports = router;