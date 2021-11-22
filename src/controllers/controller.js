
const userModel = require("../models/userModel.js")
const productModel = require("../models/productModel.js")
const orderModel = require("../models/orderModel.js")
const middleware = require("../middleware/middleware.js")



const createUser = async function (req, res) {
    var data = req.body
    let savedData = await userModel.create(data)
    res.send({ data: savedData })
}
const createProduct = async function (req, res) {
    var data = req.body
    let savedData = await productModel.create(data)
    res.send({ data: savedData })
}
const createorder = async function (req, res) {
    let usid = req.body.userId
    let pdid = req.body.productId
    let check = await userModel.findById(usid)
    if (!check) {
        res.send({ "msg": "userid is invalid" })
    }
    let check1 = await productModel.findById(pdid)
    if (!check1) {
        res.send({ "msg": "productid is invalid" })
    }

    if (req.body.isFreeAppUser === "true") {
        req.body.amount = 0;
        let saveorder = await orderModel.create(req.body)
        res.send({ "data": saveorder })
    } else {
        if (check.balance > check1.price) {
            req.body.amount = check1.price
            await userModel.findOneAndUpdate({ _id: usid }, { balance: check.balance-check1.price })
            let saveorder = await orderModel.create(req.body)
            res.send({ "data": saveorder })
        } else {
            res.send({ "msg": " doesn't have enough balance" })
        }
    }
}







module.exports.createUser = createUser
module.exports.createProduct = createProduct
module.exports.createorder = createorder

