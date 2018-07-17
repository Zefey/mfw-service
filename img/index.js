var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/:name', function(req, res, next) {
    var name = req.params.name;
    var suffix = name.substring(name.indexOf('.')+1);
    var url = './img/'+name;
    var contentType = 'image/'+suffix;
    var content =  fs.readFile(url,"binary",function(err,data){
        if(err){
            return res.send({
                status:0,
                info:'资源不存在'
            });
        }
        res.setHeader("Content-Type", contentType);
        res.writeHead(200, "Ok");
        res.write(data,"binary");
        res.end();
    });

});

router.post('/:name', function(req, res, next) {
    var name = req.params.name;
    var suffix = name.substring(name.indexOf('.')+1);
    var url = './img/'+name;
    var contentType = 'image/'+suffix;
    var content =  fs.readFile(url,"binary",function(err,data){
        if(err){
            return res.send({
                status:0,
                info:'资源不存在'
            });
        }
        res.setHeader("Content-Type", contentType);
        res.writeHead(200, "Ok");
        res.write(data,"binary");
        res.end();
    });

});

module.exports = router;
