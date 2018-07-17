var express = require('express');
var router = express.Router();
var DBHelper = require('../util/DBHelper');
var DateUtil = require('../util/dateUtil');


router.get('/', function(req, res, next) {
    var start = req.param('start') || 0;
    var offset = req.param('offset') || 5;
    start = parseInt(start);
    offset = parseInt(offset);
    var keyWord = req.param('keyWord')?'%'+req.param('keyWord')+'%':'%%';
    var options = {
        sql: 'select id,title,content,author,create_time,update_time from blog where title like ? or content like ? order by id desc limit ?,?',
        args:[keyWord,keyWord,start,offset]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results

        });

    });
});
router.post('/', function(req, res, next) {
    var start = req.param('start') || 0;
    var offset = req.param('offset') || 5;
    start = parseInt(start);
    offset = parseInt(offset);
    var keyWord = req.param('keyWord')?'%'+req.param('keyWord')+'%':'%%';
    var options = {
        sql: 'select id,title,content,author,create_time,update_time from blog where title like ? or content like ? order by id desc limit ?,?',
        args:[keyWord,keyWord,start,offset]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results

        });

    });
});

router.post('/add', function(req, res, next) {
    var sess = req.session;

    var title = req.param('title');
    var content = req.param('content');
    var create_time = new Date();
    var update_time = new Date();
    var author = sess.user?sess.user.username:'';
    if(!author){
      return res.send({
            status: 0,
            info: '未登录'
        });
    }
    if(!title || !content){
        return res.send({
            status: 0,
            info: '缺少数据'
        });
    }
    var options = {
        sql: 'insert into blog(title,content,author,create_time,update_time) values(?,?,?,?,?)',
        args:[title,content,author,create_time,update_time]
    }

    DBHelper.execQuery(options, function(results) {
        var data = {id:results.insertId};
        return res.send({
            status: 1,
            data:[data],
            info: '新增成功'

        });

    });
});


router.post('/update/:id', function(req, res, next) {
    var sess = req.session;
    var id = req.params.id;
    var title = req.param('title') || '';
    var content = req.param('content') || '';
    var update_time = new Date();
    var author = sess.user?sess.user.username:'';
    if(!author){
      return res.send({
            status: 0,
            info: '未登录'
        });
    }
    // if(!title || !content){
    //     return res.send({
    //         status: 0,
    //         info: '缺少数据'
    //     });
    // }

    var options = {
        sql: 'update blog set title = ?,content = ?,update_time = ? where id =?',
        args:[title,content,update_time,id]
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            info: '修改成功'

        });

    });
});

router.post('/delete/:id', function(req, res, next) {
    var sess = req.session;
    var id = req.params.id;

    var author = sess.user?sess.user.username:'';
    if(!author){
      return res.send({
            status: 0,
            info: '未登录'
        });
    }

    var options = {
        sql: 'delete from blog where id =?',
        args:id
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            info: '删除成功'
        });

    });
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    var options = {
        sql: 'select id,title,content,author,create_time,update_time from blog where id =?',
        args:id
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results

        });

    });
});
router.post('/:id', function(req, res, next) {
    var id = req.params.id;

    var options = {
        sql: 'select id,title,content,author,create_time,update_time from blog where id =?',
        args:id
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results

        });

    });
});

module.exports = router;
