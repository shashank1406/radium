

const mid = function (req, res, next) {
let check = req.headers.isfreeapp
    if (check) {
        req.body.isFreeAppUser = check
        next()
    }else {
        res.send({ "msg": " the request is missing a mandatory header" })
    }
    
}
module.exports.mid = mid