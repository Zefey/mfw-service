var express = require('express');
var router = express.Router();
var DBHelper = require('../util/DBHelper');

router.post('/login', function(req, res, next) {
    var openid = req.param('openid');
    var userName = req.param('nickName') || '';
    var userAvatar = req.param('avatarUrl') || '';
    var create_time = new Date();
    var update_time = new Date();

    if(!openid){
        res.send({
            status: 0,
            info: '缺少参数'
        });
    }


    var count = {
        sql: 'select count(*) as count from user where openid=?',
        args: [openid]
    }

    var insert = {
        sql: 'insert into user(openid,user_name,user_avatar,create_time,update_time,fans,focus,custom) values(?,?,?,?,?,?,?,?)',
        args: [openid,userName,userAvatar,create_time,update_time,0,0,0]
    }

    var update = {
        sql: 'update user set user_name = ?,user_avatar = ?,update_time = ? where openid =?',
        args: [userName,userAvatar,update_time,openid]
    }

    var select = {
        sql: 'select * from user where openid =?',
        args: [openid]
    }

    DBHelper.execQuery(count, function(results) {
        if(results.length>0 && results[0].count > 0){
            DBHelper.execQuery(update,function(){
                DBHelper.execQuery(select, function(results){
                    res.send({
                        status: 1,
                        info: '登录成功',
                        data:results
                    });
                });
            });
            
        }else{
            DBHelper.execQuery(insert,function(){
                DBHelper.execQuery(select, function(results){
                    res.send({
                        status: 1,
                        info: '登录成功',
                        data:results
                    });
                });
            });
            
        }
    });

});


module.exports = router;
