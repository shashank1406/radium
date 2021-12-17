const userModels = require("../models/userModel");
const jwt = require("jsonwebtoken");
const validator = require('validator')

// =============================================================================//

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number') return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}



//------------------------------------------------------------------------------------------------------------------------------//

// ====================first create user api ====================================================================================//

const createuser = async function (req, res) {
    try {
        let requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author details' })
            return
        }
        if (!isValid(requestBody.title)) {
            res.status(400).send({ status: false, message: 'title is required' })
            return
        }

        if (!isValid(requestBody.name)) {
            res.status(400).send({ status: false, message: ' name is required' })
            return
        }

        if (!isValid(requestBody.phone)) {
            res.status(400).send({ status: false, message: 'phone  is required' })
            return
        }
        if (!isValid(requestBody.email)) {
            res.status(400).send({ status: false, message: 'email is required' })
            return
        }
        if (!isValid(requestBody.password)) {
            res.status(400).send({ status: false, message: 'password is required' })
            return
        }
        if (!isValid(requestBody.address)) {
            res.status(400).send({ status: false, message: 'address is required' })
            return
        }
        if (Object.keys(requestBody.address).length === 0) {
            res.status(400).send({ status: false, message: 'address cant be empty' })
            return
        }

        if (!(validator.isEmail(requestBody.email))) {
            return res.status(400).send({ status: false, msg: 'enter valid email' })
        }

        const isEmailAlreadyUsed = await userModels.findOne({ email: requestBody.email });

        if (isEmailAlreadyUsed) {
            res.status(400).send({ status: false, message: `${requestBody.email} email address is already registered` })
            return
        }

        const isNumberAlreadyUsed = await userModels.findOne({ email: requestBody.phone });

        if (isNumberAlreadyUsed) {
            res.status(400).send({ status: false, message: `${requestBody.phone} number is already registered` })
            return
        }

        let userSaved = await userModels.create(requestBody);
        res.status(201).send({ status: true, data: userSaved });

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

//-----------------------------------------------------------------------------------------------------------------------------------------//


// ========================= second login api =============================================================================================================//


const doLogin = async function (req, res) {
    try {
        let requestBody = req.body

        if (!isValidRequestBody(requestBody)) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide login details' })
            return
        }

        if (requestBody.email && requestBody.password) {
            
            let user = await userModels.findOne({ email: requestBody.email, password: requestBody.password });

            if (!user) {
                return res.status(400).send({ status: true, msg: "Invalid login credentials" })
            }

            let payload = { _id: user._id }

            let token = jwt.sign(payload, 'projectfourth', { expiresIn: '1800s' })

            res.header('x-api-key', token);

            res.status(200).send({ status: true, data: " user  login successfull", token: { token } })

        } else {
            res.status(400).send({ status: false, msg: "must contain email and password" })
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
};

//--------------------------------------------------------------------------------------------------------------------------------------------------//

module.exports.createuser = createuser;
module.exports.doLogin = doLogin;