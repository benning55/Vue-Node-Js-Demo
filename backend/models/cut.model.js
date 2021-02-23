const mongoose = require('mongoose')

const Cut = mongoose.model(
    'Cut',
    new mongoose.Schema({
        name: String,
        cook: [String]
    })
)

module.exports = Cut