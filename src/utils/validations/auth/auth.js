const joi = require('joi');

const registerUser = joi.object({
  name: joi.string().optional(),
  firstName: joi.string().required(),
  lastName: joi.string().allow("", null),
  mobNo: joi.string().optional().regex(/^[0-9]{8,12}$/).allow(null, "").error(new Error('Mobile number must be valid and between 8 to 12 numbers.')),
  email: joi.string().email().required().error(new Error('Email must be a valid.')),
  password: joi.string().required().min(8).error(new Error('Password must be atleast 8 character')),
}).unknown(false);


const loginUser = joi.object({
  email: joi.string().email().required().error(new Error('Email must be a valid')),
  password: joi.string().required()
}).unknown(false)

module.exports = {
  registerUser,
  loginUser
}