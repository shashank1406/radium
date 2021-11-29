
const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel")


// this is the second api where we can add blog
const createBlogs= async function(req, res) {
  try{
      let data=req.body
  
      let Author= await AuthorModel.findById(data.authorId)
      if(!Author)
      {
          res.status(400).send({status:false, message:"Author_Id not found"})
      }
      else
      {
         let createdBlog=await BlogsModel.create(data)
         res.status(201).send({status:true,data:createdBlog})
      }
  }catch(error){
      res.status(500).send({status:false, mag:error});
  }
  }
  

// (3rd api)that is my third api to get all blogs data and the some codition base data
const getBlogs = async function (req, res) {
  try {
    let data = await blogModel.find({ isDeleted: false, isPublished: true });
    let authorId = req.query.authorId;
    let category = req.query.category;
    let tag = req.query.tag;
    let subcategory = req.query.subcategory;
    if (data) {
      let check = await blogModel.find({ $or: [{ authorId: authorId }, { tags: [tag] }, { category: category }, { subcategory: [subcategory] }] });
      res.status(200).send({ status: true, data: check })
    }
    else {
      res.status(200).send({ status: true, data: data })
    }
  }
  catch (error) {
    res.status(404).send({ msg: "error-response-status" })
  }
}
// that is 4th api to update a blog details which is given in the req body
const updateBlogs=async function(req,res){
  try{
  let blogId=req.params.blogId
  let newTitle=req.body.title
  let newBody=req.body.body
  let newTags=req.body.tags
  let newSubCategory=req.body.subCategory
  let today=Date();
  let data=await blogModel.find({_id:blogId})
  if(data){
  let data=await blogModel.findOneAndUpdate({_id:blogId},{title:newTitle,body:newBody,tags:newTags,subCategory:newSubCategory,isPublishedAt:today, isPublished:true},{new:true})
  res.status(200).send({msg:"successfully updated",data:data})
  }
  else{
      res.status(404).send({msg:"data not found"})

  }
}
catch(error){
  res.send(404).status({status:false,msg:"error-response-status"})
}
}

//(5th api) that is my fifth api to delete a data which blog id is given
const deleteBlogByid = async function (req, res) {
  const blogId = req.params.blogId
  let currentDate = Date().toLocaleString();
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
    let check = await blogModel.find({ $or: [{ authorId: authorid }, { tags: [tag] }, { subcategory: [subcategory] }, { isPublished: isPublished }] });
    if (check) {
      await blogModel.updateMany({ $or: [{ authorId: authorid }, { tags: [tag] }, { subcategory: [subcategory] }, { isPublished: isPublished }] }, { isDeleted: true });

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
module.exports.createBlogs = createBlogs;
// let authorIdFind=req.query.authorId
// let authorIdFind=req.query.authorId
// if(authorIdFind){
//     let data1=await blogModel.findOne({authorId:authorIdFind})
//     res.status(200).send({msg:"successful-response-status",data:data1})
// }
// let categoryFind=req.query.category
// if(categoryFind){
//     let data2=await blogModel.find({category:categoryFind})
//     res.status(200).send({msg:"successful-response-status",data:data2})
// }
// let tagsFind=req.query.tags
// if(tagsFind){
//     let data3=await blogModel.find({tags:tagsFind})
//     res.status(200).send({msg:"successful-response-status",data:data3})
// }
// let subCategoryFind=req.query.subCategory
// if(subCategoryFind){
//     let data4=await blogModel.find({subCategory:subCategoryFind})
//     res.status(200).send({msg:"successful-response-status",data:data4})
// }
// res.status(200).send({msg:"successful-response-status",data:data})