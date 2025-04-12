
const { RESPONSE_CODE } = require('../config/constants/responseCodeConstant');
const responseCode = require('./responseCode')

const asyncHandler = (fn) => (req, res, next ) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        logger.error(err.message);
        res.status(responseCode.internalServerError).json({
          code: RESPONSE_CODE.ERROR,
          message: err.message,
          data: {},
        });
    });
}

module.exports = asyncHandler

// const asyncHandler = (func) => async (req, res, next) => {

//     try {
//         await func(req, res, next)
        
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: error.message || 'Server Error'
//         })
        
//     }

// }