var express = require('express');
var router = express.Router();
var DBHelper = require('../util/DBHelper');
var DateUtil = require('../util/dateUtil');

//查询

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

router.get('/replyList', function(req, res, next) {

    var options = {
        sql:'select * from reply'
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
        sql:'select * from banner'
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
        sql:'select * from quickKnow'
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});

router.get('/routeList', function(req, res, next) {

    var options = {
        sql:'select * from route'
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});

//新增、编辑

router.post('/handelTravel', function(req, res, next) {
    var id = req.param('id') || '';
    var imgs = req.param('imgs') || '';
    var content = req.param('content') || '';
    var openid = req.param('openid') || '';
    var user_avatar = req.param('user_avatar') || '';
    var user_name = req.param('user_name') || '';
    var location = req.param('location') || '';
    var time = req.param('time') || new Date();
    var likes = req.param('likes') || 0;
    var create_time = new Date();
    var update_time = new Date();

    var options = {}

    if(id){
        console.log('编辑 handelTravel');
        options = {
            sql:'update travel set time=?,imgs=?,content=?,openid=?,user_avatar=?,user_name=?,location=?,likes=?,update_time=? where id=?',
            args:[time,imgs,content,openid,user_avatar,user_name,location,likes,update_time,id]
        }
    }else{
        console.log('新增 handelTravel');
        options = {
            sql:'insert into travel(time,imgs,content,openid,user_avatar,user_name,location,likes,create_time,update_time) values(?,?,?,?,?,?,?,?,?,?)',
            args:[time,imgs,content,openid,user_avatar,user_name,location,0,create_time,update_time]
        }
    }
    
    DBHelper.execQuery(options, function(results) {
        console.log('handelTravel results',results);
        return res.send({
            status: 1,
            info:'修改成功'
        });
    });

});

router.post('/handelReply', function(req, res, next) {
    var id = req.param('id') || '';
    var user_avatar = req.param('user_avatar') || '';
    var user_name = req.param('user_name') || '';
    var openid = req.param('openid') || '';
    var travel_id = req.param('travel_id') || '';
    var content = req.param('content') || '';
    var create_time = new Date();
    var update_time = new Date();

    var options = {}

    if(id){
        console.log('编辑 handelReply');
        options = {
            sql:'update reply set user_avatar=?,user_name=?,openid=?,travel_id=?,content=?,update_time=? where id=?',
            args:[user_avatar,user_name,openid,travel_id,content,update_time,id]
        }
    }else{
        console.log('新增 handelReply');
        options = {
            sql:'insert into reply(user_avatar,user_name,openid,travel_id,content,create_time,update_time) values(?,?,?,?,?,?,?)',
            args:[user_avatar,user_name,openid,travel_id,content,create_time,update_time]
        }
    }
    
    DBHelper.execQuery(options, function(results) {
        console.log('handelReply results',results);
        return res.send({
            status: 1,
            info:'修改成功'
        });
    });

});


router.post('/handelBanner', function(req, res, next) {
    var id = req.param('id') || '';
    var location = req.param('location') || '';
    var type = req.param('type') || '';
    var img = req.param('img') || '';
    var title = req.param('title') || '';
    var url = req.param('url') || '';
    var create_time = new Date();
    var update_time = new Date();

    var options = {}

    if(id){
        console.log('编辑 handelBanner');
        options = {
            sql:'update banner set location=?,type=?,img=?,title=?,url=?,update_time=? where id=?',
            args:[location,type,img,title,url,update_time,id]
        }
    }else{
        console.log('新增 handelBanner');
        options = {
            sql:'insert into banner(location,type,img,title,url,create_time,update_time) values(?,?,?,?,?,?,?)',
            args:[location,type,img,title,url,create_time,update_time]
        }
    }
    
    DBHelper.execQuery(options, function(results) {
        console.log('handelBanner results',results);
        return res.send({
            status: 1,
            info:'修改成功'
        });
    });

});

router.post('/handelLocation', function(req, res, next) {
    var id = req.param('id') || '';
    var name = req.param('name') || '';
    var type = req.param('type') || '';
    var pre_name = req.param('pre_name') || '';
    var img = req.param('img') || '';
    var hot = req.param('hot') || '';
    var create_time = new Date();
    var update_time = new Date();

    var options = {}

    if(id){
        console.log('编辑 handelLocation');
        options = {
            sql:'update location set name=?,type=?,pre_name=?,img=?,hot=?,update_time=? where id=?',
            args:[name,type,pre_name,img,hot,update_time,id]
        }
    }else{
        console.log('新增 handelLocation');
        options = {
            sql:'insert into location(name,type,pre_name,img,hot,create_time,update_time) values(?,?,?,?,?,?,?)',
            args:[name,type,pre_name,img,hot,create_time,update_time]
        }
    }
    
    DBHelper.execQuery(options, function(results) {
        console.log('handelLocation results',results);
        return res.send({
            status: 1,
            info:'修改成功'
        });
    });

});

router.post('/handelQuickKnow', function(req, res, next) {
    var id = req.param('id') || '';
    var location = req.param('location') || '';
    var img = req.param('img') || '';
    var big_title = req.param('big_title') || '';
    var title = req.param('title') || '';
    var content = req.param('content') || '';
    var create_time = new Date();
    var update_time = new Date();

    var options = {}

    if(id){
        console.log('编辑 handelQuickKnow');
        options = {
            sql:'update quickKnow set location=?,img=?,big_title=?,title=?,content=?,update_time=? where id=?',
            args:[location,img,big_title,title,content,update_time,id]
        }
    }else{
        console.log('新增 handelQuickKnow');
        options = {
            sql:'insert into quickKnow(location,img,big_title,title,content,create_time,update_time) values(?,?,?,?,?,?,?)',
            args:[location,img,big_title,title,content,create_time,update_time]
        }
    }
    
    DBHelper.execQuery(options, function(results) {
        console.log('handelQuickKnow results',results);
        return res.send({
            status: 1,
            info:'修改成功'
        });
    });

});


router.post('/handelRoute', function(req, res, next) {
    var id = req.param('id') || '';
    var title = req.param('title') || '';
    var titleImg = req.param('titleImg') || '';
    var content_Img = req.param('content_Img') || '';
    var tags = req.param('tags') || '';
    var location = req.param('location') || '';
    var location_title = req.param('location_title') || '';
    var route = req.param('route') || '';
    var location_img = req.param('location_img') || '';
    var content = req.param('content') || '';
    var create_time = new Date();
    var update_time = new Date();

    var options = {}

    if(id){
        console.log('编辑 handelRoute');
        options = {
            sql:'update route set title=?,titleImg=?,content_Img=?,tags=?,location=?,location_title=?,route=?,location_img=?,content=?,update_time=? where id=?',
            args:[location,img,big_title,title,content,update_time,id]
        }
    }else{
        console.log('新增 handelRoute');
        options = {
            sql:'insert into route(title,titleImg,content_Img,tags,location,location_title,route,location_img,content,create_time,update_time) values(?,?,?,?,?,?,?,?,?,?,?)',
            args:[title,titleImg,content_Img,tags,location,location_title,route,location_img,content,create_time,update_time]
        }
    }
    
    DBHelper.execQuery(options, function(results) {
        console.log('handelRoute results',results);
        return res.send({
            status: 1,
            info:'修改成功'
        });
    });

});

//删除

router.get('/travelDelete', function(req, res, next) {
    var id = req.param('id') || '';

    if(!id){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'delete from travel where id =?',
        args:[id]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});

router.get('/replyDelete', function(req, res, next) {
    var id = req.param('id') || '';

    if(!id){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'delete from reply where id = ?',
        args:[id]
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


router.get('/bannerDelete', function(req, res, next) {
    var id = req.param('id') || '';

    if(!id){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'delete from banner where id = ?',
        args:[id]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });

    });
});

router.get('/locationDelete', function(req, res, next) {
    var id = req.param('id') || '';

    if(!id){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'delete from location where id = ?',
        args:[id]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });

    });
});

router.get('/quickKnowDelete', function(req, res, next) {
    var id = req.param('id') || '';

    if(!id){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'delete from quickKnow where id = ?',
        args:[id]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});

router.get('/routeDelete', function(req, res, next) {
    var id = req.param('id') || '';

    if(!id){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:'delete from route where id = ?',
        args:[id]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results
        });
    });

});


module.exports = router;
