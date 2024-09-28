const mongoose = require('mongoose')
const getNextUserID = require('../controller/getId')

const CustomerSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    enquiryType: {
        type: String
    },
    mobile: {
        type: Number
    },
    email: {
        type: String
    },
    package: {
        type: String
    },
    stage: {
        type: String
    },
    executiveName: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    noOfAdults: {
        type: Number
    },
    noOfChildren: {
        type: Number
    },
    billingAmount: {
        type: Number
    },
    paid: {
        type: Number
    },
    balancePayment: {
        type: Number
    },
    userId: {    // Add this field for storing userId
        type: String,
        unique: true
    }
})
CustomerSchema.pre('save', async function (next) {
    const customer = this;
    if (customer.isNew) {
        try {
            const userId = await getNextUserID(); // Generate userId
            customer.userId = userId;  // Assign the userId to the document
        } catch (error) {
            return next(error);  // If there's an error, pass it to next()
        }
    }
    next();

});


module.exports = mongoose.model('customer', CustomerSchema)