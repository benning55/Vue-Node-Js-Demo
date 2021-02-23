const mongoose = require('mongoose')

const Beef = mongoose.model(
    'Beef',
    new mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        cutId: {type: mongoose.Schema.Types.ObjectId, ref: 'Cut'},
        image: String
    })
)

module.exports = Beef