const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel")


const createAuthor= async function (req, res) {
    try{
    let authorDetails= req.body
    let check = (authorDetails.email).includes('@')
if(check){
    let createdAuthor= await authorModel.create(authorDetails)
    res.status(201).send({ status:true, msg:createdAuthor})
}else{
    res.status(400).send({status:false, msg:"enter correct email"})

}

} catch(err){
    res.status(500).send({status:false, msg:"something went wrong",err});
}
};


module.exports.createAuthor = createAuthor;