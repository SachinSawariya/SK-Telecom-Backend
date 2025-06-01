const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const repaymentSchema = new Schema({
    countOfLoanTenure: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Pending'], 
        required: true
    },
    paymentDate: {
        type: Date,
        required: false
    }
}, { _id: false });

const individualLoanSchema = new Schema({
    serviceName: {
        type: String,
        required: true
    },
    loanDate: {
        type: Date,
        default: Date.now
    },
    applicantName: {
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
    mobileNumber: {
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
    RepaymentStatus: {
        type: [repaymentSchema],
        required: true
    },
    remainingTenure: {
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
    totalPayableAmount: {
        type: Number,
        required: true
    },
    loanStatus: {
        type: String,
        enum: ['Inprogress', 'Completed'],
        default: 'Inprogress'
    },
    isActive: {
        type: Boolean,
        default: true,
    }

}, {timestamps: true});

individualLoanSchema.plugin(mongoosePaginate)

const loanUser = mongoose.model('LoanUser', individualLoanSchema, 'loanUser');

module.exports = { loanUser: loanUser, individualLoanSchema };
