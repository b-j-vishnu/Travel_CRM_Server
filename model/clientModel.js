const mongoose = require('mongoose')

const clientSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    mobile: Number
})
module.exports = mongoose.model('client', clientSchema)
