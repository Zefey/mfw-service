var express = require('express');
var router = express.Router();
var DBHelper = require('../util/DBHelper');

/* GET users listing. */
router.post('/login', function(req, res, next) {
    var username = req.param('username');
    var password = req.param('password');

    if(!username && !password){
        res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql: 'select * from user where username = ?',
        args: username
    }

    DBHelper.execQuery(options, function(results) {
        if(results && results.length > 0){
            if (password === results[0].password) {
                req.session.user = {
                    username: username
                };
                return res.send({
                    status: 1,
                    info: '登录成功'
                });
            } else {
                return res.send({
                    status: 0,
                    info: '登录失败'
                });
            }
        }else{
            return res.send({
                status: 0,
                info: '登录失败'
            });
        }

    });

});

router.post('/logout', function(req, res, next) {
    var sess = req.session;
    sess.destroy();

    return res.send({
        status: 1,
        info: '登出成功'
    });

});


module.exports = router;
