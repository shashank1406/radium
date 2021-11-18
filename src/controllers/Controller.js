const bookModel = require("../models/bookModel.js")
const authorModel = require("../models/authorModel.js")


const createAuthor = async function (req, res) {
    var data = req.body
    let savedData = await authorModel.create(data)
    res.send({ msg: savedData })
}



const createBookUser = async function (req, res) {
    let data = req.body
    let author=req.body.author
    let acd = await authorModel.findById(author)
    if(acd){
        let savedData = await bookModel.create(data)
        res.send({ data: savedData })
    }else{
        res.send({msg:"enter valid authorid"})
    }
    
}

const getAllBook = async function (req, res) {
    let allBook = await bookModel.find().populate('author');
    res.send({ data:allBook  })
}

// .populate('myAuthor')
 




module.exports.createBookUser = createBookUser
module.exports.createAuthor = createAuthor
module.exports.getAllBook = getAllBook
