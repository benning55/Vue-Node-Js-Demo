const {
    authJwt
} = require("../middleware")
const auth = require("./auth.routes")
const home = require("./home.routes")


module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/auth", auth)
    app.use("/api/home", home)
}