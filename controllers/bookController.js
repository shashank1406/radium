const userModel = require("../models/userModel");
const bookModels = require("../models/bookModel");
const reviewModel = require('../models/reviewModel')
const mongoose = require('mongoose')  // change -- add this
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

const isValidObjectId = function(objectId) { // change -- add this validation to check object id type
  return mongoose.Types.ObjectId.isValid(objectId)
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
    if (!isValid(requestBody.userId)) {   // change -- add isvalid function for user id
      res.status(400).send({ status: false, message: ' user id is required' })
      return
    }

    if(!isValidObjectId(requestBody.userId)) {       // change -- add this function
      res.status(400).send({status: false, message: `${requestBody.userId} is not a valid user id`})
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
      return res.status(400).send({status:false,message:'unauthorized access'})
   }
   



    let userCheck = await userModel.findOne({ _id: requestBody.userId })
    if (!userCheck) {
      return res.status(400).send({ status: false, msg: "user dosnt exis with this user id" })
    }

    let titleCheck = await bookModels.findOne({ title: requestBody.title })
    if (titleCheck) {
      return res.status(400).send({ status: false, msg: "title already exist" })
    }

    let ISBNCheck = await bookModels.findOne({ ISBN: requestBody.ISBN }) //change -- ISBN in book model not in user model
    if (ISBNCheck) {       //change -- remove ! sign from here
      return res.status(400).send({ status: false, msg: "ISBN already exist" })
    }

    requestBody.deletedAt = requestBody.isDeleted === true ? Date() : ''   //null

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

    let filterObject ={ isDeleted:false }

    if (isValid(req.query.userId)) {
      filterObject.userId =req.query.userId
    }

    if(req.query.userId){

    if(!isValidObjectId(req.query.userId)) {      
      res.status(400).send({status: false, message: `${req.query.userId} is not a valid user id`})
      return
     }

   }

    if (isValid(req.query.category)) {
      filterObject.category =req.query.category
    }

    if (isValid(req.query.subcategory)) {
      filterObject.subcategory =req.query.subcategory
    }

   
   
    let search = await bookModels.find(filterObject).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 });


    if (search.length == 0) {
       return res.status(404).send({ status: false, message:" no book with this combination found" })
    }
     
    
   
    search.sort((a, b) => {
      let fa = a.title.toLowerCase(),
          fb = b.title.toLowerCase();
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
  });

    res.status(200).send({ status: true, message:"Book list", data:search}) 

  
  } catch (error) {

    res.status(500).send({ status: false, error: error.message });

  }
}


// ========================================================================================================================================================================================/


// =================================fifth api get book by id ===================================================================================================================================//

const getBooksBYId = async function (req, res) {
  try {

    let bookId = req.params.bookId;

    if(!isValidObjectId(bookId)) {       // change -- add this function
      res.status(400).send({status: false, message: `${bookId} is not a valid book id`})
      return
  }

    const bookDetail = await bookModels.findOne({ _id: bookId, isDeleted: false });
    if(!bookDetail){
      return res.status(404).send({status:false, message:"book not found"})
    }

    const reviewsData = await reviewModel.find({ bookId: bookId, isDeleted: false }).select({ _id: 1, bookId: 1, reviewedBy: 1, rating:1, review: 1, releasedAt: 1 });;
    
    // bookDetail kaise hatayein from response
    res.status(200).send({ status: true, message: 'Books list', data: {...bookDetail.toObject(),reviewsData}});

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
      res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide  details to update' }) //change-- erase author
      return
    }

    let bookId = req.params.bookId;
    if(!isValidObjectId(bookId)) {       // change -- add this function
      res.status(400).send({status: false, message: `${bookId} is not a valid book id`})
      return
  }

    let bookIdCheck = await bookModels.findOne({ _id: bookId, isDeleted: false })

    if(!bookIdCheck){    // change -- add this for book not exist
      return res.status(404).send({status:false,message:'book not found'})
    }

    if(!(req.validToken._id == bookIdCheck.userId)){
      return res.status(400).send({status:false,message:'unauthorized access'})
    }

    if (!bookIdCheck) {
      return res.status(404).send({ status: false, msg: 'book not exist please provie valid book id' })
    }

    let uniqueCheck = await bookModels.find({$or: [{ title: requestBody.title }, { ISBN: requestBody.ISBN }]} )
    
    if (uniqueCheck.length > 0) {  //change -- remove === and write > sign
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

    if(!checkBook){    // change -- add this for book not exist 
      return res.status(404).send({status:false,message:'book not found or already deleted'})
    }

    if(!(req.validToken._id == checkBook.userId)){
      return res.status(400).send({status:false,message:'unauthorized access'})
    }

    // if (!checkBook) {
    //   return res.status(404).send({ status: false, msg: 'book dosnt exist or already deleted' })
    // }

    let updateBook = await bookModels.findOneAndUpdate({ _id: bookId }, { isDeleted: true, deletedAt: new Date() }, { new: true })

    res.status(200).send({ status: true, message: 'sucessfully deleted', data: updateBook })

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





