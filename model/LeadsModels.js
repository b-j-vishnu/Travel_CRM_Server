const mongoose = require('mongoose')
const getNextUserID = require('../controller/getId')
const leadSchema = mongoose.Schema({
    firstName: {
        type: String,
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
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    executiveName: {
        type: String
    },
    stage: {
        type: String
    },
    dealValue: {
        type: String
    },
    followUpDate: {
        type: Date,
    },
    expectedClosureDate: {
        type: Date,
    },
    package: {
        type: String
    },
    plannedNoOfDays: {
        type: Number
    },
    destination: {
        type: String
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
leadSchema.pre('save', async function (next) {
    const lead = this;

    // Only generate a new userId if this is a new document
    if (lead.isNew) {
        try {
            const userId = await getNextUserID(); // Generate userId
            lead.userId = userId;  // Assign the userId to the document
        } catch (error) {
            return next(error);  // If there's an error, pass it to next()
        }
    }

    next(); // Call next() to proceed with the save
});


module.exports = mongoose.model('leads', leadSchema)