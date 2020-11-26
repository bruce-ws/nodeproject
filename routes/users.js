var express = require('express');
var router = express.Router();
// 导入业务层controller里面的user.js
const userController = require('../controller/user');


/* 验证码接口 */
router.get('/authcode',userController.authcode);

// 注册接口
router.post('/register',userController.register);

// 登陆接口
router.post('/login',userController.login);

module.exports = router;
