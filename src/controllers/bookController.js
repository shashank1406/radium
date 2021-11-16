const bookModel = require("../models/bookModel.js")

const createUser= async function (req, res) {
    var data= req.body
    let savedData = await bookModel.create(data)
    res.send({msg: savedData})    
}


const getUsersData = async function (req, res) {
    let allbooks= await bookModel.find().select({bookname:1,authorName:1})
    res.send({msg: allbooks})
}

const getBooksInYear= async function (req, res) {
    let allbooks= await bookModel.find( { year: req.body.year } )
    res.send({msg: allbooks})
}

const getParticularBooks= async function (req, res) {
    let allbooks= await bookModel.find( req.body)
		 res.send({msg: allbooks})
}

const getXINRBooks= async function (req, res) {
    let allbooks= await  bookModel.find({ 'price.indianPrice' : { $in: ["100inr", "200inr", "500inr"] } } )
    res.send({msg: allbooks})
}

const getRandomBooks= async function (req, res) {
    let allbooks= await bookModel.find({$or:[{stockAvailable:true},{totalPage:{$gt:500}}]})
    res.send({msg: allbooks})
}




module.exports.createUser= createUser
module.exports.getUsersData= getUsersData 
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks
module.exports.getXINRBooks=getXINRBooks
module.exports.getRandomBooks= getRandomBooks