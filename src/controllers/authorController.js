const authorModel = require("../model/authorModel");
const blogModel = require("../model/blogModel")

// that is the api number one to create a author
const createAuthor= async function (req, res) {
    try{
    let authorDetails = req.body
    let check = (authorDetails.email).includes('@');
    if(!check){
        res.status(400).send({status:false, msg:"enter correct email"});
    }
    // hear we  can check the email formet is correct or not
   let createdAuthor= await authorModel.create(authorDetails);
    // in line no 11 we can create a data in database
    res.status(201).send({ status:true, msg:createdAuthor});

} catch(err){
    res.status(500).send({status:false, msg:"something went wrong",err});
}
};


module.exports.createAuthor = createAuthor;