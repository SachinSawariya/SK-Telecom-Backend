const joi = require('joi');

const addLoanUser = joi.object({
  serviceName: joi.string().required(),
  applicantName: joi.string().required(),
  fathersName: joi.string().allow("", null),
  aadharNumber: joi.string().required(),
  mobileNumber: joi.string().regex(/^[0-9]*$/).min(8).max(12).error(new Error('Mobile number must be valid and between 8 to 12 numbers.')),
  address: joi.string(),
  loanAmount: joi.number().required(),
  loanTenure: joi.number().required(),
  loanInterest: joi.number().required(),
  emiAmount: joi.number().required(),
  totalPayableAmount: joi.number().required(),
}).unknown(true);

module.exports = {
  addLoanUser
}