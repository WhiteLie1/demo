const Base = require('./base.js');
//测试user
module.exports = class extends Base {
 
  async indexAction() {
    const goodsName = this.model('goods_item');//control 创建了一个user用户
    const data = await goodsName.field('name, goods_number,retail_price,picture_url').select();//awwit 等待
      return this.json(data);//get在params中执行
    }
}
