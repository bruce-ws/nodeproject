//1:引入
const multer = require('multer');


// 2设置文件上传的位置,以及文件的名称
var storage = multer.diskStorage({
    // 将文件上传到指定的位置
    destination: function (req, file, cb) {
        cb(null, './public/img')
    },
    // 更改上传后文件的名称
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
// 3应用上面的配置项
var upload = multer({ storage: storage })
// 4设置当前文件一共能上传几个文件
var cpUpload = upload.fields([{ name: 'booksUrl', maxCount: 1 }])

module.exports = cpUpload;