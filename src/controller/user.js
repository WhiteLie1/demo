const Base = require('./base.js');
//测试user
module.exports = class extends Base {
  async indexAction() {
    const user = this.model('user');//control 创建了一个user用户
    const data = await user.select();//awwit 等待
    return this.json(data);//get在params中执行
    }
    //添加数据 其实在这两个语句是一样的，他们并没什么不同，只是需要返回一下
    /*async addAction(){
    let model = this.model('user');
    let insertId = await model.add({user_name:'小明',user_tel:150336659});
    }*/
    //添加数据
    async createAction(){
    const userName = this.post('user_name');
    const userTel = this.post('user_tel');
    const user = {user_name: userName, user_tel: userTel};
    const userId = await this.model('user').add(user);
    const newUser = await this.model('user').where({user_id: userId}).find();
    return this.json({newUser});
    }
    //更改数据
    async updateAction(){
    const userName = this.post('user_name');
    const newTel = this.post('new_tel');
    await this.model('user').where({user_name: userName}).update({user_tel:newTel});
    const updatedUser = await this.model('user').where({user_name:userName,user_tel:newTel}).select();
    return this.json({updatedUser});
    //return this.json({newUser});
    }
    //删除数据
    async deleteAction(){
    const userName = this.post('user_name');
    await this.model('user').where({user_name:userName}).delete();
    return this.indexAction();
    }
    //查找数据
    async findAction(){
    const userId = this.get('user_id');
    const userList = await this.model('user').where({user_id:userId}).select();
    }
    
};
