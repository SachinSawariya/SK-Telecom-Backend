const { individualLoanSchema } = require('./individualLoanForm.model.js')
const { userSchema } = require('./user.model.js')

const schemas = [
    {
        model: "LoanUser", schema: individualLoanSchema, collection: "loanUsers" 
    },
    {
        model: "User", schema: userSchema, collection: "user"
    }
];

module.exports = schemas;