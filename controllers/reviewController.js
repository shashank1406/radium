const reviewModel = require('../models/reviewModel')
const bookmodel = require('../models/bookModel')
const bookModel = require('../models/bookModel')
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
      res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author details' })
      return
    }

    if (!isValid(requestBody.bookId)) {
      res.status(400).send({ status: false, message: 'bookId is required' })
      return
    }

    if (!isValid(requestBody.rating)) {
      res.status(400).send({ status: false, message: ' rating is required' })
      return
    }


    await bookmodel.findOneAndUpdate({ _id: req.params.bookId }, { reviews: checkBookId.reviews + 1 }, { new: true })

    requestBody.rereviewedAt = new Date()

    let create = await reviewModel.create(requestBody)

    res.status(201).send({ status: true, message: 'review created sucessfully', data: create })


  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
}


// ===============================================================================================================================================================//

// ========================================= nine api to update review by i in parama =============================================================================// 


const updateReview = async function (req, res) {
  try {
    let bookId = req.params.bookId
    let reviewId = req.params.reviewId
    let requestBody = req.body

    let checkreviewId = await reviewModel.findOne({ _id: reviewId,bookId:bookId, isDeleted: false })
    if (!checkreviewId) {
      return res.status(404).send({ status: false, message: 'review with this bookid does not exist' })
    }

    let checkBookId = await bookModel.findOne({ _id: bookId, isDeleted: false })
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

    if (requestBody.rating && typeof requestBody.rating === 'number' && (requestBody.rating >= 1 || requestBody.rating <= 5)) {
      updateData.rating = requestBody.rating
    }

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