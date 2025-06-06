const express = require('express');
const userLoanRoutes = require('./loanRoutes.js')
const authRoutes = require('./authRoutes.js')

const router = express.Router();


router.use('/auth', authRoutes);
router.use('/loan', userLoanRoutes)

module.exports = router;