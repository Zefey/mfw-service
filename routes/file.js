var express = require('express');
var path = require('path');
var fs = require('fs');
var multipart = require('connect-multiparty');
var DBHelper = require('../util/DBHelper');
var DateUtil = require('../util/dateUtil');


var multipartMiddleware = multipart();
var router = express.Router();

router.post('/upload',multipartMiddleware,function(req, res, next) {
    //定义
    var sess = req.session;
    var file = req.files.file;
    var HOST = 'http://' + req.headers.host;
    var LOCAL_HOST = './public/';
    var PATH = 'file/';
    var URL_PATH = '/file/';
    var arr = [];
    var resData = [];

    //判断是否为多个文件
    if (typeof file === 'object' && !isNaN(file.length)) {
        arr = file;
    } else {
        arr.push(file);
    }

    for(var i in arr){
        console.log('arr',arr);
        console.log('arr',JSON.stringify(arr));
        var filePath = arr[i]['path'];
        var fileName = arr[i]['name'];
        // ext. 扩展名
        var extension = fileName.substring(fileName.indexOf('.'));
        // 1000-9999 随机数
        var random = Math.floor(Math.random()*(9999-1000+1)+1000);
        // 时间戳
        var timestamp = new Date().getTime();

        var saveName = timestamp + random + extension;
        var savePath = LOCAL_HOST + PATH + saveName;

        var url = HOST + URL_PATH + saveName;
        resData.push(url);


        var data = fs.readFileSync(filePath);
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
});


module.exports = router;
