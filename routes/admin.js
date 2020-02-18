var express = require('express');
var router = express.Router();
var DBHelper = require('../util/DBHelper');
var DateUtil = require('../util/dateUtil');


router.get('/travelList', function(req, res, next) {
    var options = {
        sql:'select * from travel',
        args:[location]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});

router.get('/replyList', function(req, res, next) {

    var options = {
        sql:'select * from reply',
        args:[travelId]
    }

    DBHelper.execQuery(options, function(results) {
        let result = [];
        if(results && results.length>0){
            result = results;
        }
        return res.send({
            status: 1,
            data: result
        });

    });
});


router.get('/bannerList', function(req, res, next) {

    var options = {
        sql:'select * from banner',
        args:[type,location]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });

    });
});

router.get('/locationList', function(req, res, next) {

    var options = {
        sql:'select * from location'
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });

    });
});

router.get('/quickKnowList', function(req, res, next) {

    var options = {
        sql:'select * from quickKnow',
        args:[location]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});

router.post('/handelTravel', function(req, res, next) {
    var id = req.param('id') || '';
    var imgs = req.param('imgs') || '';
    var content = req.param('content') || '';
    var openid = req.param('openid') || '';
    var userAvatar = req.param('userAvatar') || '';
    var userName = req.param('userName') || '';
    var location = req.param('location') || '';
    var time = req.param('time') || new Date();
    var likes = 0;
    var create_time = new Date();
    var update_time = new Date();

    if(!imgs || !content || !openid){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {}

    if(id){
        console.log('编辑');
        options = {
            sql:'update travel set time=?,imgs=?,content=?,openid=?,user_avatar=?,user_name=?,location=?,likes=?,update_time=? where id=?',
            args:[time,imgs,content,openid,userAvatar,userName,location,likes,update_time,id]
        }
    }else{
        console.log('新增');
        options = {
            sql:'insert into travel(time,imgs,content,openid,user_avatar,user_name,location,likes,create_time,update_time) values(?,?,?,?,?,?,?,?,?,?)',
            args:[time,imgs,content,openid,userAvatar,userName,location,likes,create_time,update_time]
        }
    }
    
    DBHelper.execQuery(options, function(results) {
        console.log('results',results);
        return res.send({
            status: 1,
            info:'修改成功'
        });
    });

});


module.exports = router;
