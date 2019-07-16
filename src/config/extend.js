const view = require('think-view');
const model = require('think-model');
const cache = require('think-cache');
const session = require('think-session');
const websocket = require('think-websocket');//扩展一个websocket支持

module.exports = [
  view, // make application support view
  model(think.app),//让框架支持模型的功能
  cache,
  session,
  websocket(think.app)//websocket的加入配置
];
