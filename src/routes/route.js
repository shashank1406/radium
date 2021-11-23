const express = require('express');

const router = express.Router();

const userModel= require("../models/userModel")
const productModel= require("../models/loginModel")

const controler = require("../controllers/controller")
const middleware = require("../middleware/middleWare")



router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/createUser' ,controler.createUser  );
router.post('/login' ,controler.login );
router.get('/users/:userId', middleware.tokenCheck,controler.dataById );
router.put('/users/:userId',middleware.tokenCheck ,controler.updateName );

module.exports = router;