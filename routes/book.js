const express = require('express');
const router = express.Router();

const bookController = require('../controller/book');


// 添加书籍接口
router.post('/addbook',bookController.addBook);


// 书籍列表渲染接口
router.post('/bookslist',bookController.booksList);

// 书籍总量的接口
router.post('/booksgroos',bookController.booksGroos)

// 删除数据接口

router.get('/delbook',bookController.booksDel)

// 根据添加查数据接口
router.post('/findbook',bookController.findBook)

// 修改数据接口
router.post('/updatabook',bookController.updataBook)

module.exports = router;

