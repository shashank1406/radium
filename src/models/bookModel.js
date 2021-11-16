const mongoose=require('mongoose')

const bookSchema = new mongoose.Schema({
    bookName: {type:String,required:true},
    price: {indianprice:String,europianprice:String },
    year:{type:Number,default:2021},
    tags:[String],
    authorName:String,
    totalPage:Number,
    stockAvailable:Boolean
}, {timestamps: true} )







module.exports=mongoose.model('new book collection',bookSchema)

