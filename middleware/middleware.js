// const jwt = require('jsonwebtoken');


// const authentication = function (req, res, next) {
//     try {

//         let token = req.headers["x-auth-token"]

//         if (token) {

//             let decodedToken = jwt.verify(token, "projectfourth")

//             if (decodedToken) {

//                 req.validToken = decodedToken

//                 next()

//             } else {

//                 res.status(401).send({ msg: "token is not verified" })

//             }

//         } else {
//             res.status(401).send({ status: false, msg: "request is missing a mandatory token header" })
//         } 

//     } catch (error) {

//         res.status(500).send({ status: false, msg: error.message })

//     }
// }

// module.exports.authentication = authentication





const jwt = require('jsonwebtoken')

const authentication = async function (req, res, next) {
    
    try { 
        
        const token = req.headers['x-auth-token']
        
        if (!token) {
            
            res.status(400).send({ status: false, msg: "request is missing a mandatory token header" })
        
        } 
        
        const decodedToken = jwt.verify(token, 'projectfourth')
        
        if (!decodedToken) {
            
            res.status(400).send({ status: false, msg: "user not found" })
        
        } 
        
        req.validToken = decodedToken
        
        next() 
    
    } catch (error) {
        
        res.status(400).send({ status: false, msg: error }) }
    
    }
module.exports.authentication = authentication;