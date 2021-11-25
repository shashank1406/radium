const express = require('express');

const router = express.Router();



const controler = require("../controllers/controller")




router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.get('/londonWeathear' ,controler.londonWeathear  );
router.get('/londonTemprature' ,controler.londonTemprature  );
router.get('/sortedTemp' ,controler.sortedTemp  );
module.exports = router;