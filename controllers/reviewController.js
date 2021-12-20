const reviewModel = require('../models/reviewModel')
const bookmodel = require('../models/bookModel')
const bookModel = require('../models/bookModel')
const mongoose = require('mongoose')  // change -- add this
const { findOneAndUpdate } = require('../models/reviewModel')

// ====================================================================================================================================================//

// ===================== globle function for validation ===============================================================================================//


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

// ====================================================================================================================================================//

// ================================= eight api to create review =========================================================================================// 


const createReview = async function (req, res) {
  try {
    let requestBody = req.body

    let checkBookId = await bookModel.findOne({ _id: req.params.bookId, isDeleted: false })
    if (!checkBookId) {
      return res.status(404).send({ status: false, message: 'book does not exist' })
    }

    if (!isValidRequestBody(requestBody)) {
      res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide review details' })
      return
    }

    if (!isValid(req.params.bookId)) {  // change --  book id from prams
      res.status(400).send({ status: false, message: 'bookId is required' })
      return
    }

    if(!isValidObjectId(req.params.bookId)) {       // change -- add this function
      res.status(400).send({status: false, message: `${req.params.bookId} is not a valid book id`})
      return
  }

   //change -- add this seprately to validate rating
    if (typeof requestBody.rating === 'undefined' || requestBody.rating === null ||  (typeof requestBody.rating === 'string' && requestBody.rating.trim().length === 0) ) {
      res.status(400).send({ status: false, message: ' rating required' })
      return
    }
   
    //change -- add this for checking range
    if ( !(requestBody.rating>=1 && requestBody.rating<=5 )) {
      res.status(400).send({ status: false, message: ' rating should be in range of number 1 to 5' })
      return
    }

    await bookmodel.findOneAndUpdate({ _id: req.params.bookId }, { reviews: checkBookId.reviews + 1 }, { new: true })

    requestBody.reviewedAt = new Date()
    requestBody.bookId = req.params.bookId
    requestBody.reviewedBy = requestBody.reviewedBy?requestBody.reviewedBy:'Guest';
    


    let create = await reviewModel.create(requestBody);
    
    const data = {
     _id:create._id , 
     bookId: create.bookId, 
     reviewedBy: create.reviewedBy, 
     reviewedAt: create.reviewedAt, 
     rating: create.rating, 
     review: create.review 

    }
    res.status(201).send({ status: true, message: 'review created sucessfully', data: data })


  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
}


// ===============================================================================================================================================================//

// ========================================= nine api to update review by id in parama =============================================================================// 


const updateReview = async function (req, res) {
  try {
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId
    let requestBody = req.body

    if (!isValidRequestBody(requestBody)) {
      res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide review details' })
      return
    }

    if(!isValidObjectId(bookId)) {       // change -- add this function
      res.status(400).send({status: false, message: `${bookId} is not a valid book id`})
      return
  }

  if(!isValidObjectId(reviewId)) {       // change -- add this function
    res.status(400).send({status: false, message: `${reviewId} is not a valid review id`})
    return
}

    let checkreviewId = await reviewModel.findOne({ _id: reviewId,bookId:bookId, isDeleted: false })
    if (!checkreviewId) {
      return res.status(404).send({ status: false, message: 'review with this bookid does not exist' })
    }

    let checkBookId = await bookModel.findOne({ _id: bookId, isDeleted: false })  // yeh wala kaam nahi aaya
    if (!checkBookId) {
      return res.status(404).send({ status: false, message: 'book does not exist in book model' })
    }

    

    let updateData = {}

    if (isValid(requestBody.review)) {
      updateData.review = requestBody.review
    }

    if (isValid(requestBody.reviewedBy)) {
      updateData.reviewedBy = requestBody.reviewedBy
    }
    
    if (requestBody.rating && typeof requestBody.rating === 'number' && requestBody.rating >= 1 && requestBody.rating <= 5) {
      updateData.rating = requestBody.rating
    }
    
    if(!(requestBody.rating >= 1 && requestBody.rating <= 5)){
      return res.status(400).send({status:false, message: "rating should be in range 1 to 5 "})
    }

    // kya hum rating ke liye kuch karna hai like yeh update toh nahi kar raha wahi rakh raha hain ,kya hume range batani hai
    
    const update = await reviewModel.findOneAndUpdate({ _id: reviewId }, updateData, { new: true })
    res.status(200).send({ status: true, message: 'review updated sucessfully', data: update })

  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
}

//   =====================================================================================================================================================================//

// =============================== thnth api tp delete review by book id and review id in params==========================================================================//


const deleteReview = async function (req, res) {
  try {
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId

    if(!isValidObjectId(bookId)) {       // change -- add this function
      res.status(400).send({status: false, message: `${bookId} is not a valid book id`})
      return
  }

  if(!isValidObjectId(reviewId)) {       // change -- add this function
    res.status(400).send({status: false, message: `${reviewId} is not a valid review id`})
    return
}

    let checkreviewId = await reviewModel.findOne({ _id: reviewId,bookId:bookId, isDeleted: false })
    if (!checkreviewId) {
      return res.status(404).send({ status: false, message: 'review with this bookid does not exist' })
    }

    let checkBookId = await bookModel.findOne({ _id: bookId, isDeleted: false })
    if (!checkBookId) {
      return res.status(404).send({ status: false, message: 'book does not exist' })
    }

  

    let update = await reviewModel.findOneAndUpdate({_id:reviewId},{isDeleted:true},{new:true})
    let updateCount =await bookmodel.findOneAndUpdate({_id:bookId},{reviews:checkBookId.reviews-1},{new:true})

    res.status(200).send({status:true,msg:'review sucessfully deleted',data:update})
    
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
}



//   ================================================================================================================================================================================/



module.exports.createReview = createReview;
module.exports.updateReview = updateReview;
module.exports.deleteReview = deleteReview;

