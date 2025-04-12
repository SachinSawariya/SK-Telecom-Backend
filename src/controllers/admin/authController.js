const authService = require('../../services/authService')
const { LOGIN } = require('../../config/constants/authConstant');

const register = asyncHandler(async (req, res) => {
    const data = { ...req.body }

    const result = await authService.registerUser(req, data);

    if (result.flag) {
        return utils.createdDocumentResponse(result.data, res)
    } else {
        return utils.failureResponse(result.data, res);
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const result = await authService.loginUser(req, { email, password })

    if (result.flag === LOGIN.SUCCESS) {
        // res.message = _localize("auth.loginSuccess", req);
        return utils.successResponse(result.data, res);
    } else {
        res.message = _localize(result.data, req);
        return utils.passwordEmailWrong(res);
    }
})

module.exports = {
    register,
    login
}