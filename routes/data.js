var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

//读取数据
router.get('/read', function(req, res, next) {
  var type = req.param('type') || '';
  fs.readFile(PATH+type+'.json',function(err, data){
    if(err){
        return res.send({
            status:0,
            info:'读取数据失败'
        });
    }

    var obj = JSON.parse(data.toString());
    return res.send({
        status:1,
        data:obj
    });
  });
});

//存储数据
router.post('/write', function(req, res, next) {
  var type = req.param('type') || '';

  var title = req.param('title') || '';
  var url = req.param('url') || '';
  var img = req.param('img') || '';

  if(!title || !url || !img){
    return res.send({
        status:0,
        info:'缺少数据'
    });
  }

  fs.readFile(PATH+type+'.json',function(err, data){
    if(err){
        return res.send({
            status:0,
            info:'读取数据失败'
        });
    }
    var arr = JSON.parse(data.toString());
    var obj = {
      id:guid(),
      img:img,
      url:url,
      title:title,
      time:new Date()
    }
    arr.splice(0,0,obj);
    var json = JSON.stringify(arr);
    fs.writeFile(PATH+type+'.json', json ,function(err){
      if(err){
          return res.send({
              status:0,
              info:'写入数据失败'
          });
      }
      return res.send({
              status:1,
              info:obj
          });
    });
  });


});
  //生成guid
  function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

module.exports = router;
