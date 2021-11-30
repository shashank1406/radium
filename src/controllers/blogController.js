
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel")


// this is the second api where we can create ablog blog
const createBlogs = async function (req, res) {
  try {
    let authorid = req.body.authorId
    let date = Date()
    let Author = await authorModel.findById(authorid);
    // in line no 11 we can check the author id is valid or not 
    if (Author) {
      req.body.publishedAt = date;
      req.body.isPublished = true;
      // in line no 14/15 we can key value pairs in req.body
      let createdBlog = await blogModel.create(req.body);
      // in line no 16 we can create a data in database
      res.status(201).send({ status: true, data: createdBlog });

    } else {
      res.status(400).send({ status: false, message: "Author_Id not found" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error });
  }
}


// (3rd api)that is my third api to get all blogs data and the some codition base data
const getBlogs = async function (req, res) {
  try {
    let authorId = req.query.authorId;
    let category = req.query.category;
    let tag = req.query.tag;
    let subcategory = req.query.subcategory;
    const check = await blogModel.find({ isDeleted: false }, { isPublished: true });
    if (check) {
      let result = await blogModel.find({ $or: [{ authorId: authorId }, { tags: tag }, { category: category }, { subcategory: subcategory }] });
      res.status(200).send({ status: true, data: result });
    }
    else {
      res.status(200).send({ status: false, msg: "no data exist" });
    }
  } catch (error) {
    res.status(400).send({ status: false, error: error });
  }
}



// that is 4th api to update a blog details which is given in the req body
const updateBlogs = async function (req, res) {
  try {
    let blogid = req.params.blogId
    let newTitle = req.body.title
    let newBody = req.body.body
    let newTags = req.body.tags
    let newSubCategory = req.body.subCategory
    let today = Date();
    let data = await blogModel.findById(blogid)
    console.log(data)
    if (data) {
      let data = await blogModel.findOneAndUpdate({ _id: blogid }, { title: newTitle, body: newBody, tags: newTags, subCategory: newSubCategory, PublishedAt: today, isPublished: true }, { new: true })
      res.status(200).send({ msg: "successfully updated", data: data });
    }
    else {
      res.status(404).send({ msg: "data not found" });

    }
  }
  catch (error) {
    res.status(404).send({ status: false, msg: "error-response-status" });
  }
}

//(5th api) that is my fifth api to delete a data which blog id is given
const deleteBlogByid = async function (req, res) {
  const blogId = req.params.blogId
  let currentDate = Date()
  try {
    let check = await blogModel.findOne({ _id: blogId, isDeleted: false });
    if (check) {
      await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true, deletedAt: currentDate });

      res.status(200).send({ status: true, msg: "sucessfully deleted" });
    } else {
      res.status(404).send({ status: false, msg: "blog dosnt exist" });
    }

  } catch (error) {
    res.status(400).send({ status: false, msg: error });
  }
}
// (6th api)last api to delete a blog by search givin condition i that api
//  i can use or condition to find the data and 
// in updatemany i can use the same condition
const deleteBlogByQuerConditoin = async function (req, res) {
  try {
    let authorid = req.query.authorid;
    let tag = req.query.tag;
    let subcategory = req.query.subcategory;
    let isPublished = req.query.isPublished;
    let check = await blogModel.find({ $or: [{ authorId: authorid }, { tags: tag }, { subcategory: subcategory }, { isPublished: isPublished }] });
    if (check) {
      await blogModel.updateMany({ $or: [{ authorId: authorid }, { tags: tag }, { subcategory: subcategory }, { isPublished: isPublished }] }, { isDeleted: true });
      res.status(200).send({ status: true, msg: "sucessfully deleted" });
    } else {
      res.ststus(400).send({ status: false, msg: "!No blog found" });
    }
  } catch (error) {
    res.status(400).send({ status: false, msg: error });
  }

}
module.exports.getBlogs = getBlogs;
module.exports.deleteBlogByid = deleteBlogByid;
module.exports.deleteBlogByQuerConditoin = deleteBlogByQuerConditoin;
module.exports.updateBlogs = updateBlogs;
module.exports.createBlogs = createBlogs



