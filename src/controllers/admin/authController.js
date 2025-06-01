const authService = require('../../services/authService')
const { LOGIN } = require('../../config/constants/authConstant');

const register = asyncHandler(async (req, res) => {
    const data = { ...req.body }

    const result = await authService.registerUser(req, data);

    if (result.flag) {
        res.message = "User Registration Successfully";
        return utils.createdDocumentResponse(result.data, res)
    } else {
        return utils.failureResponse(result.data, res);
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.loginUser(req, { email, password })

    if (result.flag === LOGIN.SUCCESS) {
        res.message = "User Login Successfully";
        return utils.successResponse(result.data, res);
    } else {
        res.message = "User Email or Password Wrong";
        // res.message = _localize(result.data, req);
        return utils.passwordEmailWrong(res);
    }
})

module.exports = {
    register,
    login
}