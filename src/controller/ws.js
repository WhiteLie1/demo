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
    //return this.success();
    this.broadcast('close','连接关闭！')
  }
  messageAction(){//这边拿到的是服务端的数据，不能和html之间相互调用过来
    //const data = this.wsData.data;//数据回传到服务器
    //this.broadcast('message',data);//服务器传回数据 {"message":"open","data":"cx"} 数据交互发送的格式
    this.wsData.data.time = think.datetime(new Date(), 'HH:mm:ss') //时间样式的设定
    console.log('拿到message数据了吗?');
    this.broadcast('message',this.wsData.data) //Data 行里面的数据
  }

  onlineAction(){
    const id = this.wsData.data.id;
    //userList.push(id);
    console.log('游客上线了吗');
    //this.broadcast('online',`游客${id}ws游客上线了`);
    this.broadcast('offline',`游客ws${id}上线了`);//这里是系统广播上线
  }
  offlineAction(){
    const id = this.wsData.data.id;
    // userList = userList.filter(userId => userId !== id);
    console.log('游客下线了吗');
    this.broadcast('offline',`游客ws${id}下线了`);
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
