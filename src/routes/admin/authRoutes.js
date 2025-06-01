const express = require('express');
const authController = require('../../controllers/admin/authController');
const validate = require('../../policies/validate');
const uservalidation = require('../../utils/validations/auth')

const router = express.Router();

router.post('/register', validate(uservalidation.registerUser), authController.register)
router.post('/login', validate(uservalidation.loginUser) ,authController.login)

module.exports = router;


