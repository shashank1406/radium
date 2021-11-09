const express = require('express');

const router = express.Router();

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

router.get('/movies', function (req, res) {
    res.send(['dilwale','karanarjun','ddlj','baggi3','radhr','bajrangi bhaijan','baby','housefull','dhol','dhamal'])
});

router.get('/movies/:index', function (req, res) {
    const array = ['dilwale','karanarjun','ddlj','baggi3','radhr','bajrangi bhaijan','baby','housefull','dhol','dhamal'];
    let value = req.params.index;
    const result = value>array.length? "plese use a valid index": array[value];
    res.send(result)
});

router.get('/films', function (req, res) {
    res.send([{"id":1,"name":"dilwale"},{"id":2,"name":"karanarjun"},{"id":3,"name":"ddlj"},{"id":4,"name":"baggi3"}])
});

router.get('/films/:filmid', function (req, res) {
    const mvs = [{id: 1,name:"dilwale"},{id: 2,name:"karanarjun"},{id: 3,name:"ddlj"},{id: 4,name:"baggi3"}]
    const value = req.params.filmid;
    let no =0
    for(let i=0;i<mvs.length;i++){
        if(mvs[i].id==value){
            res.send(mvs[i])
            no=1
            break
            
        }
    }
    if(no==0)
    res.send("movie does not exist")
    
});

module.exports = router;