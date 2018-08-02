var express = require('express');
var router = express.Router();
var DBHelper = require('../util/DBHelper');
var DateUtil = require('../util/dateUtil');


router.get('/', function(req, res, next) {
    var pages = 0;
    var pageNum = parseInt(req.param('pageNum') || 1);
    var prePage = pageNum-1;
    var nextPage = pageNum+1;
    var hasPreviousPage = pageNum!=1;
    var hasNextPage = pageNum!=pages;

    var offset = 8;
    var start = (pageNum-1)*offset;
    var keyWord = req.param('keyWord')?'%'+req.param('keyWord')+'%':'%%';
    var categoryId = req.param('categoryId')?'%'+req.param('categoryId')+'%':'%%';
    var labelId = req.param('labelId')?'%'+req.param('labelId')+'%':'%%';

    var options = {
        sql:'SELECT b.id,b.title,b.content,DATE_FORMAT(b.create_time,"%Y-%m-%d") AS time,c.name AS category,group_concat(l.name) AS label '+
            'FROM relation AS r '+
            'LEFT JOIN blog AS b ON b.id = r.blog_id '+
            'LEFT JOIN category AS c ON c.id = r.category_id '+
            'LEFT JOIN label AS l ON l.id = r.label_id '+
            'WHERE (b.title LIKE ? OR b.content LIKE ?) AND c.id LIKE ? AND l.id LIKE ? '+
            'GROUP BY b.id '+
            'ORDER BY b.id DESC '+
            'LIMIT ?,?',
        args:[keyWord,keyWord,categoryId,labelId,start,offset]
    }

    var count = {
        sql:'SELECT COUNT(*) '+
            'FROM '+
            'relation AS r '+
            'LEFT JOIN blog AS b ON b.id = r.blog_id '+
            'LEFT JOIN category AS c ON c.id = r.category_id '+
            'LEFT JOIN label AS l ON l.id = r.label_id '+
            'WHERE (b.title LIKE ? OR b.content LIKE ?) AND c.id LIKE ? AND l.id LIKE ? '+
            'GROUP BY b.id',
        args:[keyWord,keyWord,categoryId,labelId]
    }
    DBHelper.execQuery(count, function(results) {
        pages = Math.ceil(parseInt(results.length)/offset);
        hasNextPage = pageNum!=pages;
    });

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            pages:pages,
            pageNum:pageNum,
            prePage:prePage,
            nextPage:nextPage,
            hasPreviousPage:hasPreviousPage,
            hasNextPage:hasNextPage,
            data: results

        });

    });
});


router.get('/detail', function(req, res, next) {
    var id = req.param('id') || '';

    if(!id){
        return res.send({
            status: 0,
            info: '缺少参数'
        });
    }

    var options = {
        sql:    'SELECT b.id,b.title,b.content,DATE_FORMAT(b.update_time,"%Y-%m-%d") AS time,c.name AS category,group_concat(l.name) AS label '+
                'FROM relation AS r '+
                'LEFT JOIN blog AS b ON b.id = r.blog_id '+
                'LEFT JOIN category AS c ON c.id = r.category_id '+
                'LEFT JOIN label AS l ON l.id = r.label_id '+
                'WHERE b.id = ? '+
                'GROUP BY b.id',
        args:[id]
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
            info: '缺少参数'
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


router.post('/update', function(req, res, next) {
    var sess = req.session;
    var id = req.param('id') || '';
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
    //         info: '缺少参数'
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

router.post('/delete', function(req, res, next) {
    var sess = req.session;
    var id = req.param('id') || '';

    var author = sess.user?sess.user.username:'';
    if(!author){
      return res.send({
            status: 0,
            info: '未登录'
        });
    }

    if(!id){
        return res.send({
            status: 0,
            info: '缺少参数'
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

router.get('/rank', function(req, res, next) {

    var options = {
        sql: 'select id,title from blog as b order by b.id desc limit 0,6'
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results

        });

    });
});

router.get('/category', function(req, res, next) {

    var options = {
        sql: 'select id,name from category'
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results

        });

    });
});


router.get('/label', function(req, res, next) {

    var options = {
        sql: 'select id,name from label'
    }

    DBHelper.execQuery(options, function(results) {
        return res.send({
            status: 1,
            data: results

        });

    });
});

module.exports = router;
