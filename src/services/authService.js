const { LOGIN } = require("../config/constants/authConstant");


const registerUser = async (req, data) => {
    try {
        const { User } = connections.models;
        data.mobNo = data?.mobNo?.replace(/^0/g, '');

        const $or = [
            { email: data.email },
            { mobNo: data.mobNo }
        ];

        const existingUser = await User.findOne({ $or });
        if(existingUser) {
            return { flag: false, data: "Email or Mobile already exists"}
        }

        const userData = {
            firstName: data.firstName,
            lastName: data?.lastName,
            email: data.email,
            mobNo: data.mobNo,
            password: data.password,
        }
        const user = await User.create(userData);

        return { flag: true, data: user};

    } catch (error) {
        logger.error("Error - employerRegistration", error);
        throw new Error(error);
    }
}

const loginUser = async (req, data) => {
    try {
        const { User } = connections.models;

        let user = await User.findOne({email: data?.email});
        if(!user){
            return {
                flag: LOGIN.ACCOUNT_NOT_FOUND,
                data: {}
            }
        }
        let isPasswordMatched = await user.isPasswordMatch(data?.password)
        if (!isPasswordMatched) {
            return {
              flag: LOGIN.PASSWORD_WRONG,
              data: {}
            //   data: _localize('auth.passwordWrong', req),
            };
        }
        return { flag: LOGIN.SUCCESS, data: user };

    } catch (error) {
        logger.error('Error - loginUserError', error);
        throw new Error(error);
    }
}

module.exports = {
    registerUser,
    loginUser
}