const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const mysql = require('think-model-mysql');
const ws = require('think-websocket-ws');//导包
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',//默认使用的类型，调用时可以指定参数切换
  common: {// 通用配置
    logConnect: isDev,// 是否打印数据库连接信息
    logSql: isDev,// 是否打印 SQL 语句
    logger: msg => think.logger.info(msg)// 打印信息的 logger
  },
  mysql: {
    handle: mysql,
    database: 'day712',//自己的数据库的名字
    //prefix: 'think_', 暂时用不上
    encoding: 'utf8',
    host: '127.0.0.1',
    port: 3306,
    user: 'root',//数据库用户名
    //password: process.env.PASSWD,
    password: '123456',//用户名密码
    dateStrings: true
    //connectionLimit: 1, // 连接池的连接个数，默认为 1
    //prefix: '', // 数据表前缀，如果一个数据库里有多个项目，那项目之间的数据表可以通过前缀来区分
    //acquireWaitTimeout: 0, // 等待连接的超时时间，避免获取不到连接一直卡在那里，开发环境下有用
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};
//wx.js的配置问题
exports.websocket = {
  type: 'ws',
  common: {
    // common config
  },
  ws: {
    handle: ws,
    path: '/ws',
    messages: [{ //接收websocket的信息
      close: '/ws/close',//closeaction的设置
      open: '/ws/open',//关闭和开启连接的接口
      message: '/ws/message', //这里改成 message
      addUser:'/ws/addUser'
    }]
  }
}