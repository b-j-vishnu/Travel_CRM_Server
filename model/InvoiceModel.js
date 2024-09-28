const mongoose = require('mongoose')

const InvoiceSchema = mongoose.Schema({
    proposalDate: {
        type: Date,
    },
    validDate: {
        type: Date
    },
    acceptPaymentVia: {
        type: String
    },
    executiveName: {
        type: String
    },
    mobile: {
        type: Number
    },
    email: {
        type: String
    },

    destinationTemplate: {
        type: String
    },
    fullName: {
        type: String
    },
    userId: {
        type: String
    },
    total: {
        type: Number
    },
    pending: {
        type: Number
    },
    invoiceTo: {
        type: String
    },
    status: {
        type: String
    }

})

module.exports = mongoose.model('invoice', InvoiceSchema)