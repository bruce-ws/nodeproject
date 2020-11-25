// svg验证码模块
const captcha = require('svg-captcha');

const authcode = (req,res) => {
    var _captcha = captcha.create({
        size: 4,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 3, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#cbdf338f', // 验证码图片背景颜色
    })
    // 向客户端返回数据 _captcha是一个对象 {data:svg地址，text:验证码}
    res.send( _captcha);

}

module.exports = {
    authcode
}