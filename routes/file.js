var express = require('express');
var path = require('path');
var fs = require('fs');
var multipart = require('connect-multiparty');
var DBHelper = require('../util/DBHelper');
var DateUtil = require('../util/dateUtil');

var PATH = '/img/';

var multipartMiddleware = multipart();
var router = express.Router();

router.post('/upload',multipartMiddleware,function(req, res, next) {
    var sess = req.session;
    var imgs = req.files.imgs;
    var HOST = req.headers.host;

    var arr = [];
    var resData = [];

    if (typeof imgs === 'object' && !isNaN(imgs.length)) {
        arr = imgs;
    } else {
        arr.push(imgs);
    }

    for(var i in arr){
        var path = arr[i]['path'];
        var name = arr[i]['name'];
        var suffix = name.substring(name.indexOf('.'));
        var random = Math.round(Math.random()*10000);
        var timestamp = new Date().getTime();
        var saveName = timestamp + random + suffix;
        var savePath = './'+PATH + saveName;
        var url = 'http://' + HOST + PATH + saveName;
        resData.push(url);


        var data = fs.readFileSync(path);
        var ret = fs.writeFileSync(savePath, data);
        if(ret){
            return res.send({
                status:0,
                info:'上传失败'
            });
        }

    };

    return res.send({
        status:1,
        info:'上传成功',
        data:resData
    });


    // var author = sess.user?sess.user.username:'';
    // if(!author){
    //   return res.send({
    //         status: 0,
    //         info: '未登录'
    //     });
    // }

    // var options = {
    //     sql: 'insert into blog(title,content,author,create_time,update_time) values(?,?,?,?,?)',
    //     args:[title,content,author,create_time,update_time]
    // }
    //
    // DBHelper.execQuery(options, function(results) {
    //     var data = {id:results.insertId};
    //     return res.send({
    //         status: 1,
    //         data:[data],
    //         info: '新增成功'
    //
    //     });
    //
    // });
});


module.exports = router;
