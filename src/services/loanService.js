const { convertPaginationResults } = require("../utils/common");

const getAllUser = async (data, res) => {
  try {
    const { LoanUser } = global.connections.models;
    const { page, limit, search, filter } = data;
    const offset = (page - 1) * limit;
    const filtercount = 0;

    const matchQuery = {};

    if (filter?.serviceName) {
      matchQuery["serviceName"] = filter.serviceName;
    }
    if (filter?.loanStatus) {
      matchQuery["loanStatus"] = filter.loanStatus;
    }

    if (search) {
      matchQuery["$or"] = [
        { applicantName: { $regex: search, $options: "i" } },
        { fathersName: { $regex: search, $options: "i" } },
        { aadharNumber: { $regex: search, $options: "i" } },
      ];
    }
    const users = await LoanUser.find(matchQuery)
      .skip(offset)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = users?.length
      ? (
          await LoanUser.aggregate([
            {
              $match: matchQuery,
            },
            { $count: "totalCount" },
          ])
        )[0]["totalCount"]
      : 0;

    const result = convertPaginationResults(
      [{ metadata: [{ total }], docs: users }],
      { offset, limit },
      filtercount
    );

    return result;
  } catch (error) {
    logger.error("Error while fetching Loan Details ->", error);
    throw new Error(error.message);
  }
};


const getLoanUserDetails = async (id, res) => {
  try {
    const { LoanUser } = global.connections.models;

    const users = await LoanUser.findById(id);

    console.log("users", users)

    return users;
  } catch (error) {
    logger.error("Error while fetching Loan Details ->", error);
    throw new Error(error.message);
  }
};


const addLoanUser = async (req, data) => {
  try {
    const { LoanUser } = global.connections.models;
    const userData = {
      serviceName: data.serviceName,
      loanDate: data.loanDate,
      applicantName: data.applicantName,
      fathersName: data.fathersName,
      aadharNumber: data.aadharNumber,
      mobileNumber: data.mobileNumber,
      address: data.address,
      loanAmount: data.loanAmount,
      loanTenure: data.loanTenure,
      loanInterest: data.loanInterest,
      loanStatus: data?.loanStatus,
      totalPayableAmount: data.totalPayableAmount,
      emiAmount: data.emiAmount,
    };

    const loanUser = await LoanUser.create(userData);

    return loanUser;
  } catch (error) {
    logger.error("Error while adding Loan User ->", error);
    throw new Error(error.message);
  }
};

module.exports = {
  getAllUser,
  addLoanUser,
  getLoanUserDetails
};
