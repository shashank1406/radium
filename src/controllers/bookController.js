
const bookModel = require("../model/bookModel")

// ===========================================================================================================================================>


const redis = require('redis')

const { promisify } = require('util')

const redisClient = redis.createClient(13142, "redis-13142.c264.ap-south-1-1.ec2.cloud.redislabs.com", { no_ready_check: true });

redisClient.auth("F22C7UaLHXolOQqet2gUka5oRy9Aj3L3", function (err) {
    if (err) throw err;
});

redisClient.on("connect", async function () {
    console.log("Connected to Redis..");
});

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

// redis password= F22C7UaLHXolOQqet2gUka5oRy9Aj3L3    > that is my redis atabse password
// redis enpoint = redis-13142.c264.ap-south-1-1.ec2.cloud.redislabs.com:13142 > that is my port number and coneection string 

// =======================================================================================================================================>



const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number') return false
    return true;
}



const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

// ========================================================================================================================================>



const createBook = async function (req, res) {
    
 try {
         requestBody = req.body ;
         if(!isValidRequestBody(requestBody)) {
           return   res.status(400).send({status:false,msg:"request body empty"})
         } 

         if(!isValid(requestBody.name)) {
            return   res.status(400).send({status:false,msg:"name is empty"})
          } 
          if(!isValid(requestBody.author)) {
            return   res.status(400).send({status:false,msg:"author is empty"})
          } 
          if(!isValid(requestBody.category)) {
            return   res.status(400).send({status:false,msg:"category is empty"})
          } 
          requestBody.count = 0
         let result = await bookModel.create(requestBody)
         res.status(201).send({status:true,data:result})

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}






// ==================================================================================================================================================================================>


const getBook = async function (req, res) {
    
    try {
         bookId = req.params.bookId
      let bookResult = await bookModel.findById(bookId)
        if(bookResult.count<=5){
            res.status(200).send({status:true,data:bookResult})
            await bookModel.findOneAndUpdate({_id:bookId},{count:bookResult.count+1})
        }else{
        res.status(400).send({status:false,msg:'access limit exceed'})
        }
      
}catch(error){
           res.status(500).send({ status: false, msg: error.message })
       }
    }

//    ==========================================================================================================//

module.exports.createBook = createBook;
module.exports.getBook = getBook;
