var express = require('express');
var router = express.Router();
var DBHelper = require('../util/DBHelper');
var DateUtil = require('../util/dateUtil');


router.get('/travelList', function(req, res, next) {
    var location = req.param('location') || '';

    if(!location){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'select * from travel where location=?',
        args:[location]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});

router.post('/addTravel', function(req, res, next) {
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
    
    var options = {
        sql:'insert into travel(time,imgs,content,openid,user_avatar,user_name,location,likes,create_time,update_time) values(?,?,?,?,?,?,?,?,?,?)',
        args:[time,imgs,content,openid,userAvatar,userName,location,likes,create_time,update_time]
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
        sql:'select * from reply where travel_id = ? order by create_time desc',
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

router.post('/addReply', function(req, res, next) {
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
        sql:'insert into reply(content,openid,user_avatar,user_name,travel_id,create_time,update_time) values(?,?,?,?,?,?,?)',
        args:[content,openid,userAvatar,userName,travelId,create_time,update_time]
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
    var location = req.param('location') || '';
    
    if(!type){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    if(location){
        location = `%${location}%`;
    }

    var options = {
        sql:'select * from banner where type = ? AND (location like ? or location is null)',
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
    var location = req.param('location') || '';

    if(!location){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'select * from quickKnow where location=?',
        args:[location]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});

module.exports = router;
