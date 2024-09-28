const mongoose = require('mongoose')

const CounterSchema = mongoose.Schema({
    name: String,
    value: Number
})

module.exports = mongoose.model('Counter', CounterSchema)