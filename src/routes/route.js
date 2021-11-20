const express = require('express');

const router = express.Router();

const authorModel= require("../models/authorModel")
const authorcontroler= require("../controllers/authorcontroler")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/createAuthor', authorcontroler.createAuthor  );
router.get('/getname', authorcontroler.getname  );
router.get('/getnameandage', authorcontroler.getnameandage );



module.exports = router;