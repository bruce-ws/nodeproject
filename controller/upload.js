const cpUpload = require('../utils/upload');

const uploadImg = (req,res,next) => {
    cpUpload(req,res,(err) => {
        if(err){
            res.json({
                code : 200,
                errmsg : "",
                data : {
                    info : '服务器错误',
                    code : 0,
                    err : err
                }
            })
        }else{
            // 图片地址拼接传送给前端
            let urlPath = 'http://127.0.0.1:3000/img/' + req.files.booksUrl[0].filename
            res.json({
                code : 200,
                errmsg : "",
                data : {
                    code : 1,
                    url: urlPath
                }
            })
        }
        
    })
}


module.exports = {
    uploadImg,
}