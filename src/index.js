const express = require('express');
const moment = require('moment');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const globelmid=function(req,res,next){
    const date = moment().format('MMMM Do YYYY, h:mm:ss a');
    const ipadd = req.ip;
    const urlpath = req.originalUrl;
    console.log([date],[ipadd],[urlpath])
    
    next()

}
app.use(globelmid);
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://user-open-to-all:hiPassword123@cluster0.xgk0k.mongodb.net/shashank_shrivastava-database?retryWrites=true&w=majority", {useNewUrlParser: true})
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

app.use('/', route);


app.use(globelmid);


app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});

