// 导入model层user模块
const userModel = require('../model/user');
// 导入加密模块
const crypto = require('crypto');
// svg验证码模块
const captcha = require('svg-captcha');
const authcode = (req, res) => {
    var _captcha = captcha.create({
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 3, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#37597c', // 验证码图片背景颜色
    })
    // 在服务端把验证码存储再session里面(尽量转小写，方便判断)
    req.session.captcha = _captcha.text.toLowerCase();

    // 向客户端返回数据 _captcha是一个对象 {data:svg地址，text:验证码}
    res.send(_captcha);

}
// 注册业务逻辑
const register = async (req, res, next) => {
    // 拿到前端传递的数据
    let { username, password, authcode } = req.body;
    // 判断前端传递过来的验证码是否和服务端session里面保存的验证码相同
    if (authcode == req.session.captcha) {
        // 相同执行逻辑
        // 查询用户名是否存在
        // 如果存在阻止注册
        // 如果不存在则注册成功
        let data = await userModel.infoFind({ username });
        if (data) {
            // 用户名重复
            res.json({
                code: 200,
                errmsg: '',
                data: {
                    info: '用户名重复',
                    code: 2
                }
            })
        } else {
            // 创建加密方法
            var hash = crypto.createHash('sha256');
            // 需要加密的数据
            hash.update(password)
            // 开始注册，往数据库写入
            let obj = {
                username: username,
                password: hash.digest('hex'),
                registerDate: new Date().getTime(),
                userpic: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3458871882,2184620966&fm=26&gp=0.jpg',
                nickname: Math.random().toString(16).substring(2, 8),
                userstatus: true,
                userlevel: 0,
            }
            let userSaveDate = await userModel.infoSave(obj);
            // 接口返回数据
            res.json({
                code: 200,
                errmsg: '',
                data: {
                    info: '用户名注册成功',
                    code: 1
                }
            })
        }
    } else {
        //验证码不正确的逻辑
        res.json({
            code: 200,
            errmsg: '',
            data: {
                info: '验证码错误',
                code: -1
            }
        })
    }
}

// 登陆业务逻辑
const login = async (req, res, next) => {
    // 获取前端传送的数据
    let { username, password, authcode } = req.body;
    // 验证码
    if (authcode == req.session.captcha) {
        // 判断用户名
        let data = await userModel.infoFind({username});
        console.log(data);
        if(data){
            // 创建加密方法
            var hash = crypto.createHash('sha256');
            // 需要加密的数据
            hash.update(password)
            // 用户名正确，判断密码
            if(data.password == hash.digest('hex')){
                //登陆成功
                res.json({
                    code: 200,
                    errmsg: '',
                    data: {
                        info: '登陆成功',
                        code: 1
                    }
                })
            }else{
                // 密码错误
                res.json({
                    code: 200,
                    errmsg: '',
                    data: {
                        info: '密码错误',
                        code: 3
                    }
                })
            }
        }else{
            //用户名不存在
            res.json({
                code: 200,
                errmsg: '',
                data: {
                    info: '用户名不存在',
                    code: 2
                }
            })
        }
    } else {
        //验证码不正确的逻辑
        res.json({
            code: 200,
            errmsg: '',
            data: {
                info: '验证码错误',
                code: -1
            }
        })
    }
}
module.exports = {
    authcode,
    register,
    login
}