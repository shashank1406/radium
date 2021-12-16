const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    name:{type:String,required:true},
    author:{type:String,required:true},
    category:{type:String,required:true},
    count : Number

}, { timestamps: true })
module.exports = mongoose.model('books16dec', bookSchema)