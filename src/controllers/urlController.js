const collegeModel = require("../model/urlModel")
const validUrl = require('valid-url')
const randomString = require('randomstring')
const urlModel = require("../model/urlModel")



const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number') return false
    return true;
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}



const genrateShortUrl = async function (req, res) {
    try {
        let requestBody = req.body
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "body cant be empty please provide details" })
        }
        if (!isValid(requestBody.longUrl)) {
            return res.status(400).send({ status: false, msg: "please provide long url" })
        }
        if (!(validUrl.isWebUri(requestBody.longUrl))) {
            return res.status(400).send({ status: false, msg: "pleae provide valid url" })
        }
        let checkUrl = await urlModel.findOne({ longUrl: requestBody.longUrl })
        if (checkUrl) {
            return res.status(400).send({ status: false, msg: `This url already have shortUrl ${checkUrl.shortUrl} ` })
        }
        let urlCode = randomString.generate({ length: 5, charset: 'alphabetic' }).toLowerCase()
        let shortUrl = `http://localhost:3000/${urlCode}`
        requestBody.urlCode = urlCode
        requestBody.shortUrl = shortUrl
        let createUrl = await urlModel.create(requestBody)
        res.status(201).send({ status: true, data: createUrl })
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



const getUrl = async function (req, res) {
    try {
        let urlCode = req.params.urlCode.toLowerCase()
        let urlData = await urlModel.findOne({ urlCode: urlCode })
        if (!urlData) {
            return res.status(400).send({ status: false, msg: "this short url does not exist please provide valid url code " })
        }
        // res.redirect(301, `${urlData.longUrl}`);
        window.location.href = urlData.longUrl;

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports.genrateShortUrl = genrateShortUrl;
module.exports.getUrl = getUrl;