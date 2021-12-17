const userModel = require("../models/userModel");
const bookModels = require("../models/bookModel");
const reviewModel = require('../models/reviewModel')
const { findOne, findOneAndUpdate } = require("../models/userModel");

// ================================================================================================================================================//


const isValid = function (value) {
  if (typeof value === 'undefined' || value === null) return false
  if (typeof value === 'string' && value.trim().length === 0) return false
  if (typeof value === 'number') return false
  return true;
}

const isValidRequestBody = function (requestBody) {
  return Object.keys(requestBody).length > 0
}


// =================================================================================================================================================================//

// ========================== third api to craete book =========================================================================================================// 


const createBook = async function (req, res) {
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

    if (!isValid(requestBody.excerpt)) {
      res.status(400).send({ status: false, message: ' excerpt is required' })
      return
    }

    if (!isValid(requestBody.ISBN)) {
      res.status(400).send({ status: false, message: ' ISBN is required' })
      return
    }
    if (!isValid(requestBody.category)) {
      res.status(400).send({ status: false, message: ' category is required' })
      return
    }

    if (!isValid(requestBody.subcategory)) {
      res.status(400).send({ status: false, message: ' subcategory is required' })
      return
    }

    if (!isValid(requestBody.releasedAt)) {
      res.status(400).send({ status: false, message: ' releasedAt is required' })
      return
    }

    if(!(req.validToken._id == requestBody.userId)){
      return res.statu(400).send({status:false,message:'unauthorized access'})
   }



    let userCheck = await userModel.findOne({ _id: requestBody.userId })
    if (!userCheck) {
      return res.status(400).send({ status: false, msg: "user dosnt exis with this user id" })
    }

    let titleCheck = await bookModels.findOne({ title: requestBody.title })
    if (titleCheck) {
      return res.status(400).send({ status: false, msg: "title already exist" })
    }

    let ISBNCheck = await userModel.findOne({ ISBN: requestBody.ISBN })
    if (!ISBNCheck) {
      return res.status(400).send({ status: false, msg: "ISBN already exist" })
    }

    requestBody.deletedAt = requestBody.isDeleted === true ? Date() : null

    let savedBook1 = await bookModels.create(requestBody);

    res.status(201).send({ status: true, data: savedBook1 });

  } catch (error) {

    res.status(500).send({ status: false, msg: error.message });

  }
};


// ================================================================================================================================================================================/


// ======================fourth api to get books/ query params ==================================================================================================================//

const getBooks = async function (req, res) {
  try {

    const check = await bookModels.find({ isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 });

    if (Object.keys(req.query).length === 0) {
      return res.status(200).send({ status: true, msg: 'books list', data: check });
    }

    let search = await blogModel.find({ $or: [{ userId: req.query.userId }, { category: req.query.category }, { subcategory: req.query.subcategory }] });

    let result = []

    if (search.length > 0) {
      for (let element of search) {

        if (element.isDeleted == false && element.isPublished == true) {
          result.push(element)
        }
      }
      res.status(200).send({ status: true, data: result });

    } else {

      res.status(404).send({ status: false, message: 'No blogs found of thia author' })

    }
  } catch (error) {

    res.status(500).send({ status: false, error: error.message });

  }
}


// ========================================================================================================================================================================================/


// =================================fifth api get book by id ===================================================================================================================================//

const getBooksBYId = async function (req, res) {
  try {

    let bookId = req.params.bookId;

    const bookDetail = await bookModels.findOne({ _id: bookId, isDeleted: false });

    const reviewDetail = await reviewModel.find({ bookId: bookId, isDeleted: false });

    const result = { ...bookDetail, reviewsData: [...reviewDetail] };

    res.status(200).send({ status: true, message: 'Books list', data: result });

  } catch (error) {

    res.status(500).send({ status: false, error: error.message });
    
  }
}


// ==============================================================================================================================================================================================/

// ==================================== sixth api update book by id ===========================================================================================================================//


const updateBooksBYId = async function (req, res) {
  try {


    let requestBody = req.body;
    
    if (!isValidRequestBody(requestBody)) {
      res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author details' })
      return
    }

    let bookId = req.params.bookId;

    let bookIdCheck = await bookModels.findOne({ _id: bookId, isDeleted: false })

    if(!(req.validToken._id == bookIdCheck.userId)){
      return res.statu(400).send({status:false,message:'unauthorized access'})
    }

    if (!bookIdCheck) {
      return res.status(404).send({ status: false, msg: 'book not exist please provie valid book id' })
    }

    let uniqueCheck = await bookModels.find({ $or: [{ title: requestBody.title }, { ISBN: requestBody.ISBN }] })
    if (!uniqueCheck.length === 0) {
      return res.status(400).send({ status: false, msg: 'title or isbn number is not unique' })
    }

    let updateObject ={}

    if (isValid(requestBody.title)) {
      updateObject.title =requestBody.title
    }

    if (isValid(requestBody.excerpt)) {
      updateObject.excerpt =requestBody.excerpt
    }

    if (isValid(requestBody.ISBN)) {
      updateObject.ISBN =requestBody.ISBN
    }

    if (isValid(requestBody.releasedAt)) {
      updateObject.releasedAt =requestBody.releasedAt
    }

    
    let update = await bookModels.findOneAndUpdate({ _id: bookId },updateObject , { new: true })
    res.status(200).send({ status: true, message: 'sucessfully updated', data: update })

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
}


// ===============================================================================================================================================================================================//

// ================================= seven api to delete book by id ==================================================================================================================================//


const deleteBooksBYId = async function (req, res) {
  try {
    let bookId = req.params.bookId

    let checkBook = await bookModels.findOne({ _id: bookId, isDeleted: false })

    if(!(req.validToken._id == checkBook.userId)){
      return res.statu(400).send({status:false,message:'unauthorized access'})
    }

    if (!checkBook) {
      return res.status(404).send({ status: false, msg: 'book dosnt exist or already deleted' })
    }

    let updateBook = await bookModels.findOneAndUpdate({ _id: bookId }, { isDeleted: true, deletedAt: new Date() }, { new: true })

    res.status(200).send({ status: true, message: 'sucessfully delated', data: updateBook })

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
}


// ==========================================================================================================================================================================================================//





module.exports.createBook = createBook;
module.exports.getBooks = getBooks;
module.exports.getBooksBYId = getBooksBYId;
module.exports.updateBooksBYId = updateBooksBYId;
module.exports.deleteBooksBYId = deleteBooksBYId;