const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs); // 通过 promisify 方法把 rename 方法包装成 Promise 接口
module.exports = class extends think.Controller {
  async uploadAction(){
    const file = this.file('image');
    // 如果上传的是 png 格式的图片文件，则移动到其他目录
    if(file ) {//===三个等号是等于 不等于则是 ！==
      const filepath = path.join(think.ROOT_PATH, 'runtime/upload/a.png');
      think.mkdir(path.dirname(filepath));
      await rename(file.path, filepath)
    }
  }
}