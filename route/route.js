const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
const middleware = require('../middleware/middleware')


// ================ user api ===========================================================================================//

router.post('/register',userController.createuser)

router.post('/login',userController.doLogin)


// ================ books api =========================================================================================//


router.post('/books',middleware.authentication,bookController.createBook)

router.get('/books',middleware.authentication,bookController.getBooks)

router.get('/books/:bookId',middleware.authentication,bookController.getBooksBYId)

router.put('/books/:bookId',middleware.authentication,bookController.updateBooksBYId)

router.delete('/books/:bookId',middleware.authentication,bookController.deleteBooksBYId)


// ======================review apis ===================================================================================//


router.post('/books/:bookId/review',reviewController.createReview)

router.put('/books/:bookId/review/:reviewId',reviewController.updateReview)

router.delete('/books/:bookId/review/:reviewId',reviewController.deleteReview)


// ========================export =======================================================================================//


module.exports = router;