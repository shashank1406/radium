const bookModel = require("../models/bookModel.js")
const authorModel = require("../models/authorModel.js")
const publisherModel = require("../models/publisherModel")

const createAuthor = async function (req, res) {
    var data = req.body
    let savedData = await authorModel.create(data)
    res.send({ msg: savedData })
}


const createpublisher = async function (req, res) {
    var data = req.body
    let savedData = await publisherModel.create(data)
    res.send({ msg: savedData })
}



const createBookUser = async function (req, res) {
    let data = req.body;
    let author=req.body.author;
    let publisher=req.body.publisher;
    let conditionOne = await authorModel.findById(author)
    let  conditionTwo= await publisherModel.findById(publisher)
    if(conditionOne){
        if(conditionTwo){
        let savedData = await bookModel.create(data)
        res.send({ data: savedData })
        }else{
            res.send({msg:"enter valid publisherid"})
        }
    }else{
        res.send({msg:"enter valid authorid"})
    }
    
}

const getAllBook = async function (req, res) {
    let allBook = await bookModel.find().populate('author',['author_name','age']).populate('publisher')
    res.send({ data:allBook  })
}


 





module.exports.createAuthor = createAuthor
module.exports.createpublisher = createpublisher
module.exports.createBookUser = createBookUser
module.exports.getAllBook = getAllBook
