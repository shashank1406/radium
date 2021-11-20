
const authorModel = require("../models/authorModel.js")


const createAuthor = async function (req, res) {
    var data = req.body
    let savedData = await authorModel.create(data)
    res.send({ data: savedData })
}
const getname= async function (req, res) {
   let name =await authorModel.find().select({ author_name:1})
    res.send({ msg: name})
}

const getnameandage = async function (req, res) {
    let nameage =await authorModel.find().select({ author_name:1,age:1})
    res.send({ msg: nameage })
}



        

module.exports.createAuthor = createAuthor
module.exports.getname = getname
module.exports.getnameandage = getnameandage

