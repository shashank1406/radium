const express = require('express');

const router = express.Router();
const controller = require("../controllers/controller")
const model = require("../model/cryptoModel")



router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.get('/coins' ,controller.coins  );

module.exports = router;