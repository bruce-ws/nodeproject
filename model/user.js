const user = require('../controller/user');
const mongoose = require('../utils/database');
// Schema用来限制字段类型
const Schema = mongoose.Schema;

// 表字段设置
const userSchema = new Schema({
    username : String,
    password : String,
    registerDate : { type: Number, default: Date.now },  //注册时间
    userpic : String,           //默认头像
    nickname : String,          //默认昵称
    userstatus : Boolean,       //用户状态
    userlevel : Number          //用户等级
})
// 生成表
const users = mongoose.model('user',userSchema);

// 查找数据
const infoFind = (userInfo) => {
    return users.findOne(userInfo)
}


// 增加数据
const infoSave = (userInfo) => {
    let user = new users(userInfo);
    return user.save();
}



module.exports = {
    infoFind,
    infoSave,
}

