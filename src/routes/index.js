const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');
const addressRoutes = require('./addresses');

router.use('/auth', authRoutes);
router.use('/addresses', addressRoutes);

module.exports = router;