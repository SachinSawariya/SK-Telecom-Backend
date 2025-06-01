const { ApiResponse } = require('../utils/ApiResponse.js');
const { ApiError } = require('../utils/ApiError.js');
const { LoanUser } = require('../models/individualLoanForm.model.js')


const userLoanRegister = asyncHandler(async (req, res) => {
    try {

        const { serviceName, loanDate, ApplicantName, fathersName, aadharNumber, mobileNo, address, loanAmount, loanTenure, loanInterest, totalAmount, emiAmount } = req.body;

        // if ([serviceName, ApplicantName, fathersName, aadharNumber, mobileNo, loanAmount, loanTenure, loanInterest, emiAmount, totalAmount].some((field) => field?.trim() === "")) {
        //     throw new ApiError(400, "Please fill all the fields");
        // }

        const loanUser = await LoanUser.create({
            serviceName,
            loanDate,
            ApplicantName,
            fathersName,
            aadharNumber,
            mobileNo,
            address,
            loanAmount,
            loanTenure,
            loanInterest,
            totalAmount,
            emiAmount
        });

        return res.status(201).json(
            new ApiResponse(200, loanUser, "loan User registered successfully...")
        );

    } catch (error) {
        logger.error("error", error)
        return res.status(400).json(
            new ApiError(400, error.message, "Failed to register loan user")
        );
    }
});


const findLoanUser = asyncHandler(async (req, res) => {
    try {
        const { LoanUser } = connections.models     // global.connections is set to be globally in db.js file now.
        const { aadharNumber } = req.body;

        const result = await LoanUser.find({ aadharNumber });

        if (result.length > 0) {
            return utils.successResponse(result, res)
        } else {
            return utils.recordNotFound(res, null)
        }

    } catch (error) {
        logger.error("Error while fetching Loan Details ", error)
    }
})

module.exports = {
    userLoanRegister,
    findLoanUser,
};
