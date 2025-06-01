const { LOGIN, JWT } = require("../config/constants/authConstant");
const jwt = require("jsonwebtoken");

const generateToken = async (user, email, secret, expires = "1s") => {
  let token = jwt.sign(
    {
      id: user.id,
      email: email,
    },
    secret,
    {
      expiresIn: expires,
    }
  );
  return token;
};

const generateTokenManually = async (params, User) => {
  try {
    const user = params.user;
    const email = params.email;
    const authToken = await generateToken(
      { id: user._id },
      email,
      JWT.SECRET,
      JWT.EXPIRES_IN
    );
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const pushData = {
      token: authToken,
      validateTill: date,
    };
    await User.findOneAndUpdate(
      { _id: user._id },
      { $addToSet: { tokens: pushData } }
    );
    return authToken;
  } catch (error) {
    logger.error("Error - generateTokenManually", error);
    throw new Error(error.message);
  }
};

const registerUser = async (req, data) => {
  try {
    const { User } = connections.models;
    data.mobNo = data?.mobNo?.replace(/^0/g, "");

    const $or = [{ email: data.email }, { mobNo: data.mobNo }];

    const existingUser = await User.findOne({ $or });
    if (existingUser) {
      return { flag: false, data: "Email or Mobile already exists" };
    }

    const userData = {
      firstName: data.firstName,
      lastName: data?.lastName,
      email: data.email,
      mobNo: data.mobNo,
      password: data.password,
    };
    const user = await User.create(userData);

    return { flag: true, data: user };
  } catch (error) {
    logger.error("Error - employerRegistration", error);
    throw new Error(error);
  }
};

const loginUser = async (req, data) => {
  try {
    const { User } = connections.models;

    let user = await User.findOne({ email: data?.email }).select('-tokens');
    if (!user) {
      return {
        flag: LOGIN.ACCOUNT_NOT_FOUND,
        data: {},
      };
    }
    let isPasswordMatched = await user.isPasswordMatch(data?.password);
    if (!isPasswordMatched) {
      return {
        flag: LOGIN.PASSWORD_WRONG,
        data: {},
      };
    }

    const token = await generateTokenManually({user, email: data?.email}, User);

    const usertoReturn = {
        ...user._doc,
        ...{token}
    }
    return { flag: LOGIN.SUCCESS, data: usertoReturn };
  } catch (error) {
    logger.error("Error - loginUserError", error);
    throw new Error(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
