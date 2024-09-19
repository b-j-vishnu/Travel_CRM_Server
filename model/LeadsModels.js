const mongoose = require('mongoose')

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
    dealStage: {
        type: String
    },
    dealValue: {
        type: String
    },
    followUpDate: {
        type: Date,
        default: Date.now
    },
    expectedClosureDate: {
        type: Date,
    },
    package: {
        type: String
    },
    plannedNoOfDays: {
        type: String
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
    balanceAmount: {
        type: Number
    },
    userId: {
        type: String,
    }


})

leadSchema.pre('save', async function () {
    const doc = this;

    if (!doc.userId) {
        try {
            const leads = await mongoose.model('leads').find();
            const userId = leads.length ? Number(leads[leads.length - 1].userId.slice(1)) + 1 : 9001;
            doc.userId = `#${userId}`;

        } catch (error) {
            return console.log(error);
        }
    }

});

module.exports = mongoose.model('leads', leadSchema)