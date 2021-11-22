const express = require('express');

const router = express.Router();

const userModel= require("../models/userModel")
const productModel= require("../models/productModel")
const orderModel= require("../models/orderModel")
const controler = require("../controllers/controller")
const middleware= require("../middleware/middleware.js")



router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/createUser',middleware.mid ,controler.createUser  );
router.post('/createProduct', controler.createProduct  );
router.post('/createorder',middleware.mid , controler.createorder  );



module.exports = router;