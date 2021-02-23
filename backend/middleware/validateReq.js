const db = require("../models")
const User = db.user

async function checkEmailAndPassword(req, res, next) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: `Please send request with email and password field.`
        });
    }
    next()
}

async function checkSignUpReq(req, res, next) {
    if (!req.body.email || !req.body.password || !req.body.name || !req.file) {
        return res.status(400).send({
            message: `Please send request with email, password, name and image field.`
        });
    }
    next()
}

async function checkDuplicateEmail(req, res, next) {
    let result = await User.findOne({
        email: req.body.email
    })

    if (result) {
        return res.status(400).send({
            message: `This email have already been used.`
        });
    }

    next()
}

async function checkCreateConsentReq(req, res, next) {
    if(!req.body.type || !req.body.transactionId || !req.body.clientId || !req.body.touchId){
        return res.status(400).send({
            message: `Please send request with type, clientId, transactionId, touchId.`
        });
    }
    next()
}


const validateReq = {
    checkEmailAndPassword,
    checkDuplicateEmail,
    checkCreateConsentReq,
    checkSignUpReq
}

module.exports = validateReq;