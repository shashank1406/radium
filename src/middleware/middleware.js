
const jwt = require('jsonwebtoken')

let tokenCheck = function (req, res, next) {
    try {
    let token = req.headers['x-auth-token']
    let validToken = jwt.verify(token, 'shashank')
    if (validToken) {
        req.body.validToken = validToken
        next()
    } else {
        res.send({ status: false, msg: "invalid token" })
    }
} catch (error) {
    res.status(500).send({ status: false, message: error.message });
  }
}
module.exports.tokenCheck = tokenCheck