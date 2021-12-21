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

router.post('/createLink',bookController.createFileLink)

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


/** 
 

create user

{
    "title": "    Mr     ", 
    "name":"     Ram      ",
    "phone": "     475f4321      ",
    "email": "     samkumar1552345@gmail.com    ",
    "password": "ramk12344",
    "address": {
        "street": "rampuri",
        "city": "shyamgadh",
        "pincode": "180006"
    }

}


login

{
   "email": "shashank@gmail.com",
    "password": "shashank12344"
}

create book

{
    "title":"       aatam kaatha huamri          ", 
  "excerpt":"zarur padhe", 
  "userId":"61c01a28ad80ed7a3a1dacd8",
  "ISBN":"      123515433333334143", 
  "category":"     samajh nahi aayegi",
  "subcategory":"     children",
  "releasedAt":"2021-12-18T01:12" 
  
}


update book

{
   "ISBN":"1233453365",
   "title":"see struggle",
   "excerpt" :" you must read this and increase knowledge",
   "releasedAt":"2021-12-26"
}

review book

{
    "reviewBy":"  ",
    "rating": "  5",
    "review":"nice book"
}

update review

{
    "rating":7,
    "review": "i am changing review"
}


*/



