/**
 * 数据库模块
 */
var config = require("./config");

var options = {
    'host': config.dbhost,
    'port': config.port,
    'user': config.user,
    'password': config.password,
    'database': config.db,
    'charset': config.charset,
    'connectionLimit': config.maxConnLimit,
    'supportBigNumbers': true,
    'bigNumberStrings': true
};

var mysql = require('mysql');
var pool = mysql.createPool(options);

/**
 * 释放数据库连接
 */
exports.release = function(connection) {
    connection.end(function(error) {
        console.log('Connection closed');
    });
};

/**
 * 执行查询
 */
exports.execQuery = function(options,callback) {
    pool.getConnection(function(error, connection) {
        if (error) {
            console.log('DB-获取数据库连接异常！');
            // throw error;
        }

        

        // 查询参数
        var sql = options['sql'];
        var args = options['args'];

        // 执行查询
        if (!args) {
            var query = connection.query(sql, function(error, results) {
                if (error) {
                    console.log('DB-执行查询语句异常！');
                    // throw error;
                }

                // 处理结果
                callback(results);
            });

            console.log(query.sql);
        } else {
            var query = connection.query(sql, args, function(error, results) {
                if (error) {
                    console.log('DB-执行查询语句异常！');
                    // throw error;
                }

                // 处理结果
                callback(results);
            });

            console.log(query.sql);
        }

        // 返回连接池
        connection.release(function(error) {
            if (error) {
                console.log('DB-关闭数据库连接异常！');
                // throw error;
            }
        });
    });
};