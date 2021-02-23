const config = require("../config/auth.config")
const db = require("../models")
const User = db.user

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")
const {
    mongoose
} = require("../models")

// Save Data Section

exports.signin = async (req, res) => {
    try {

        let userReq = await User.findOne({
            email: req.body.email
        })

        if (!userReq) {
            return res.status(404).send({
                message: "User Not found."
            })
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            userReq.password
        )

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({
            id: userReq.id
        }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        return res.status(200).send({
            id: userReq._id,
            email: userReq.email,
            name: userReq.name,
            image: userReq.image,
            token: token,
        })
    } catch (err) {
        res.status(500).send({
            message: err
        });
    }
}


exports.signup = async (req, res) => {
    try {
        var fullUrl = req.protocol + '://' + req.get('host');

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            name: req.body.name,
            image: `${fullUrl}/${req.file.path}`
        })


        user.save()
        res.status(200).send({
            message: "Registered Successful!"
        });
        
    } catch (err) {
        res.status(500).send({
            message: err
        });
    }
}