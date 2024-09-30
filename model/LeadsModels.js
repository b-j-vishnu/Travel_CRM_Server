const mongoose = require('mongoose');
const getNextUserID = require('../controller/getId');

const leadSchema = new mongoose.Schema({
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
        unique: true, // Mark email as unique
        required: true,
        trim: true,
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
    userId: {
        type: String,
        unique: true // Mark userId as unique
    }
}, {
    autoCreate: true // Ensure collection is auto-created with indexes
});

// Create unique indexes for email and userId
leadSchema.index({ email: 1 }, { unique: true });
leadSchema.index({ userId: 1 }, { unique: true });

leadSchema.pre('save', async function (next) {
    const lead = this;

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

// Model definition
const Lead = mongoose.model('leads', leadSchema);

// Explicitly create indexes
Lead.createIndexes();

module.exports = Lead;
