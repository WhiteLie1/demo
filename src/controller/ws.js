const Base = require('./base.js');

module.exports = class extends Base {
  openAction() {
    console.log('WebSocket连接成功');

    //this.$emit('open','open2');//服务器传回数据 {"event":"open","data"}
    this.broadcast('open','open2');//服务器传回数据 {"event":"open","data"} 全服务器进行广播
    //服务器发送的内容格式 {\event\:\message\,\data\:\cx\} 数字则不用加引号
  }
  closeAction() {
    console.log('关闭WebSocket连接');
    return this.success();
  }
  messageAction(){
    const data = this.wsData.data;//数据回传到服务器
    this.broadcast('message',data);//服务器传回数据 {"message":"open","data":"cx"} 数据交互发送的格式

  }
  //添加用户吗？ 如何去获取一个文本输入的属性
  // on message的改变
  /*addUserAction() {
    console.log('addUserAction ...');
    console.log(this.wsData); // this.req.websocketData, 'thinkjs'
    console.log(this.websocket); // this.req.websocket, websocket instance
    console.log(this.isWebsocket); // this.isMethod('WEBSOCKET'), true
    return this.success();
  }*/

};
