const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs); // 通过 promisify 方法把 rename 方法包装成 Promise 接口
module.exports = class extends think.Controller {
  async uploadAction(){
    const file = this.file('image');
    // 如果上传的是 png 格式的图片文件，则移动到其他目录
    if(file ) {//===三个等号是等于 不等于则是 ！==
      const filepath = path.join(think.ROOT_PATH, `www/static/upload/${file.name}`);//生成了新的路径
              //新的字符目录                ` `具有强大的拼接符号
      think.mkdir(path.dirname(filepath));//创建目录
      await rename(file.path, filepath)
    }
  }

  //文件的下载
  async downloadAction(){
    const userAgent = this.userAgent().toLowerCase();
    let hfilename = '';
      if (userAgent.indexOf('msie') >= 0 || userAgent.indexOf('chrome') >= 0) 
      {
        hfilename = `=${encodeURIComponent(filename)}`;
        } 
        else if(userAgent.indexOf('firefox') >= 0) 
        {
        hfilename = `*="utf8''${encodeURIComponent(filename)}"`;
          } 
        else
        {
        hfilename = `=${new Buffer(filename).toString('binary')}`;
        }
        ctx.set('Content-Disposition', `attachment; filename${hfilename}`)
        ctx.download(filepath)

        return hello;
  }
  
}