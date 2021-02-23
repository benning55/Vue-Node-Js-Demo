const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

db.user = require("./user.model")
db.beef = require("./beef.model")
db.cut = require("./cut.model")

module.exports = db