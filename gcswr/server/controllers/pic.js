/* var formidable = require('formidable');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var fs = require('fs');

var upload = require('./multerUtil');
        //multer有single()中的名称必须是表单上传字段的name名称。
        	   
var addPic1= async (ctx, next) => {
      upload(c, res, function (err) {
        //添加错误处理
    if (err) {
         return  console.log(err);
    } 
        //文件信息在req.file或者req.files中显示。
    console.log(req);
  });
}
module.exports = {
    'POST /api/pic/add':upload.single('file'),addPic1,
};
 */