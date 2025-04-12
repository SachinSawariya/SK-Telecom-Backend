const { Router } = require('express')
const { findLoanUser, userLoanRegister } = require('../../controllers/usersLoanForm.controller');

const router = Router();

router.post('/add-user', userLoanRegister);

router.post('/list', findLoanUser);

module.exports = router;
