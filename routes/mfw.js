var express = require('express');
var router = express.Router();
var DBHelper = require('../util/DBHelper');
var DateUtil = require('../util/dateUtil');


router.get('/travelList', function(req, res, next) {
    
    var options = {
        sql:'select * from travel'
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});

router.get('/addTravel', function(req, res, next) {
    var imgs = req.param('imgs') || '';
    var title = req.param('title') || '';
    var desc = req.param('desc') || '';
    var openid = req.param('openid') || '';
    var userAvatar = req.param('userAvatar') || '';
    var userName = req.param('userName') || '';
    var location = req.param('location') || '';
    var like = 0;
    var create_time = new Date();
    var update_time = new Date();

    if(!imgs || !title || !desc || !openid){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }
    
    var options = {
        sql:'insert into travel(imgs,title,desc,openid,user_avatar,user_name,location,like,create_time,update_time) values(?,?,?,?,?,?,?,?,?,?)',
        args:[imgs,title,desc,openid,userAvatar,userName,location,like,create_time,update_time]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results.insertId,
            info:'新增成功'
        });
    });

});


router.get('/replyList', function(req, res, next) {
    var travelId = req.param('travelId') || '';

    if(!travelId){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'select * from travel where travel_id = ?',
        args:[travelId]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });

    });
});

router.get('/addReply', function(req, res, next) {
    var travelId = req.param('travelId') || '';
    var content = req.param('content') || '';
    var openid = req.param('openid') || '';
    var userAvatar = req.param('userAvatar') || '';
    var userName = req.param('userName') || '';
    var create_time = new Date();
    var update_time = new Date();

    if(!travelId || !openid || !content){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'insert into reply(openid,user_avatar,user_name,travel_id,create_time,update_time) values(?,?,?,?,?,?)',
        args:[openid,userAvatar,userName,travelId,create_time,update_time]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results.insertId,
            info:'新增成功'
        });
    });
});

router.get('/bannerList', function(req, res, next) {
    var type = req.param('type') || '';

    if(!type){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'select * from banner where type = ?',
        args:[type]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });

    });
});


module.exports = router;
