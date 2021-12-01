const express = require('express');

const router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")
const loginController = require("../controllers/logincontroller")
const middleWare = require("../middleware/middleWare")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/createAuthor', authorController.createAuthor);
router.post('/login', loginController.login);
router.post('/createBlogs', middleWare.mid, blogController.createBlogs);
router.get('/getBlogs', middleWare.mid, blogController.getBlogs);
router.put('/updateBlogs/:blogId', middleWare.mid, blogController.updateBlogs);
router.get('/blogs/:blogId', middleWare.mid, blogController.deleteBlogByid);
router.get('/blogs', middleWare.mid, blogController.deleteBlogByQuerConditoin);



module.exports = router;