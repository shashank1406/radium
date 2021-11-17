const express = require('express');
const router = express.Router();
const bookModel= require("../models/bookModel")
const authorModel= require("../models/authorModel")
const Controller= require("../controllers/Controller")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.post('/createBookUser', Controller.createBookUser );
router.post('/createauthorUser', Controller.createauthorUser  );
router.get('/getChetanData',  Controller.getChetanData );
router.get('/updateTwoStatesPrice',  Controller.updateTwoStatesPrice  );
router.get('/getAuthorName',  Controller.getAuthorName );


module.exports = router;