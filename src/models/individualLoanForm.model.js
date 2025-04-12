const mongoose = require('mongoose');
const { Schema } = mongoose;

const individualLoanSchema = new Schema({
    serviceName: {
        type: String,
        required: true
    },
    loanDate: {
        type: Date,
        default: Date.now
    },
    ApplicantName: {
        type: String,
        required: true
    },
    fathersName: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true,
        
    },
    mobileNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    loanAmount: {
        type: Number,
        required: true,
    },
    loanTenure: {
        type: Number,
        required: true
    },
    loanInterest: {
        type: Number,
        required: true
    },
    emiAmount: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },

}, {timestamps: true});

const loanUser = mongoose.model('LoanUser', individualLoanSchema, 'loanUser');

module.exports = { loanUser: loanUser, individualLoanSchema };
