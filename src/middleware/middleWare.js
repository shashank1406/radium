const jwt = require('jsonwebtoken')

const mid = async function(req,res,next){
    const token = req.header['x-api-key']
    const validToken = jwt.verify(token,'projectOne')
    if(!validToken){
        res.status(400).send({status:false,msg:"user not found"})
    }
    req.body.tokenId = validToken._id
    next()
}
module.exports.mid = mid;