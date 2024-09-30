const mongoose = require('mongoose')

const ItinerarySchema = mongoose.Schema({
    proposalDate: {
        type: Date,
        required: true
    },
    validDate: {
        type: Date,
        required: true
    },
    acceptPaymentVia: {
        type: String,
        required: true
    },
    executiveName: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    itineraryFor: {
        type: String,
        required: true,
    },
    plannedNoOfDays: { type: Number },

    destinationTemplate: {
        type: String,
        required: true,
    },
    stage: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    billingAmount: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    }, lastName: {
        type: String,
        required: true,
    },
    subject: {
        type: String
    },
    introMsg: {
        type: String
    }
})

module.exports = mongoose.model('itinerary', ItinerarySchema)