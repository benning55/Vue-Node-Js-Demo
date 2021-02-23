const controller = require('../controllers/home.controller')
const { validateReq } = require("../middleware")
var express = require("express")
var router = express.Router()
const multer = require("multer")
const path = require("path")
const helpers = require("../util/helpers")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(this.destination)
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
  })


const upload = multer({ storage: storage, fileFilter: helpers.imageFilter });

router.route("/beef")
    .get(controller.getBeef)

module.exports = router