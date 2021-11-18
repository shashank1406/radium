const express = require('express');
const router = express.Router();
const bookModel= require("../models/bookModel")
const publisherModel= require("../models/publisherModel")
const authorModel= require("../models/authorModel")
const Controller= require("../controllers/Controller")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/createAuthor', Controller.createAuthor  );
router.post('/createpublisher', Controller.createpublisher  )
router.post('/createBookUser', Controller.createBookUser );
router.get('/getAllBook',  Controller.getAllBook );



module.exports = router;