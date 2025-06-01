const loanService = require("../../services/loanService.js");

const addLoanUser = asyncHandler(async (req, res) => {
  const { ...data } = req.body;
  const result = await loanService.addLoanUser(req, data);

  if (result) {
    res.message = "Loan User Added Successfully";
    return utils.successResponse(result, res);
  } else {
    res.message = "Found Error";
    return utils.successResponse(result, res);
  }
});

const getAllLoanUser = asyncHandler(async (req, res) => {
  const data = req.body;

  const result = await loanService.getAllUser(data, res);
  if (result?.docs?.length > 0) {
    return utils.successResponse(result, res);
  } else {
    return utils.recordNotFound(res, null);
  }
});

const getLoanUserDetails = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const result = await loanService.getLoanUserDetails(id, res);
  if (result) {
    return utils.successResponse(result, res);
  } else {
    return utils.recordNotFound(res, null);
  }
});

const payUserLoanEmi = asyncHandler(async (req, res) => {
  const data = req.body;

  const result = await loanService.getLoanUserDetails(data, res);
  if (result) {
    return utils.successResponse(result, res);
  } else {
    return utils.recordNotFound(res, null);
  }
});



module.exports = {
  addLoanUser,
  getAllLoanUser,
  getLoanUserDetails,
  payUserLoanEmi
};
