const config = require("../config/auth.config")
const db = require("../models")
const User = db.user
const Beef = db.beef
const Cut = db.cut

exports.getBeef = async (req, res) => {
    try {

        let beef = await Beef.find().populate(
            'cutId'
        ).lean()

        res.status(200).send({
            beef
        });
        
    } catch (err) {
        res.status(500).send({
            message: err
        });
    }
}