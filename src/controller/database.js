const mysql = require('think-model-mysql');

module.exports = { //这是一个数据库文件
    handle: mysql,
    database: 'day712',
    //prefix: 'nideshop_',
    encoding: 'utf8',
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    dateStrings: true
};
