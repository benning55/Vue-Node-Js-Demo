const mongoose = require('mongoose')

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        email: String,
        password: String,
        name: String,
        image: String
    })
)

module.exports = User