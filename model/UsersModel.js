const mongoose = require('mongoose')

const usersSchema = mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('users', usersSchema)
