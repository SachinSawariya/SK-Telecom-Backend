const express = require('express');
const loanController = require('../../controllers/admin/loanController');
const {addLoanUser} = require('../../utils/validations/loan/addLoanUser')

const routes = express.Router();

routes.get('/loan-details/:id', authentication, checkPermission, loanController.getLoanUserDetails)
routes.post('/add-user', authentication, checkPermission, validate(addLoanUser) ,loanController.addLoanUser);
routes.post('/list', authentication, checkPermission, loanController.getAllLoanUser);
routes.post('/emi-pay', authentication, checkPermission, loanController.payUserLoanEmi);


module.exports = routes;
