const express = require('express');

const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController.js")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/collegeCreate', collegeController.collegeCreate);
router.post('/internCreate', internController.internCreate);
router.get('/getAllIntern', collegeController.getAllIntern);


module.exports = router;