const bookModel = require("../models/bookModel.js")
const authorModel = require("../models/authorModel.js")

// this is first book create api
const createBookUser= async function (req, res) {
    var data= req.body
    let savedData = await bookModel.create(data)
    res.send({msg: savedData})    
}
// this is second author create api
const createauthorUser= async function (req, res) {
    var data= req.body
    let savedData = await authorModel.create(data)
    res.send({msg: savedData})    
}

// this is my 3rd api to get chetan bhagat daya
const getChetanData = async function (req, res) {
    let ChetanDetail = await authorModel.find({author_name:"Chetan Bhagat"});
    let resdata = await  bookModel.find({author_id: ChetanDetail[0].author_id})
    res.send({msg:resdata })
}

// this  is my 4th api to get update value and author name
const updateTwoStatesPrice= async function (req, res) {
    let book= await bookModel.find({name:"Two states"})
    let res1 =book[0].author_id
    let res2 = await authorModel.find({author_id:res1})
    let res3 =res2[0].author_name
    await bookModel.updateMany({name:"Two states"},{price:100})
    let price = book[0].price
    res.send({"authorName":res3,"updatedPrice":price})
}
const getAuthorName= async function (req, res) {
    let book = await bookModel.find({price:{$in:[50,100]}});
    let len= book.length
    let array=[]
    let array1=[]
    for(let element of book){
        let a = element.author_id
        let b = element.name;
        array.push(a)
        array1.push(b)
    }
let arrayOfNames=[]
for(let element of array){
    let name= await authorModel.find({author_id:element})
    arrayOfNames.push(name[0].author_name)
}
    
    res.send({"books":array1,"authors":arrayOfNames})
}




module.exports.createBookUser= createBookUser
module.exports.createauthorUser= createauthorUser
module.exports.getChetanData= getChetanData
module.exports.updateTwoStatesPrice= updateTwoStatesPrice
module.exports.getAuthorName= getAuthorName
