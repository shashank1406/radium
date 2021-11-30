const express = require('express');

const router = express.Router();
const blogController = require("../controllers/blogController")
const authorController = require("../controllers/authorController")


router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});
router.post('/createAuthor', authorController.createAuthor);
router.post('/createBlogs', blogController.createBlogs);
router.get('/getBlogs', blogController.getBlogs);
router.put('/updateBlogs/:blogId', blogController.updateBlogs);
router.get('/blogs/:blogId', blogController.deleteBlogByid);
router.get('/blogs', blogController.deleteBlogByQuerConditoin);



module.exports = router;