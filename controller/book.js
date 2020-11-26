const bookModel = require('../model/book');
// 添加书籍数据
const addBook = async (req,res,next) => {
    let {bookname,bookauthor,bookdes,booktype,bookstatus,booksimgurl} = req.body;
    let data = await bookModel.bookSave({
        bookname,
        bookauthor,
        bookdes,
        booktype,
        bookstatus,
        booksimgurl
    })  
    res.json({
        code : 200,
        errMsg : "",
        data : {
            code : 1,
            info : '书籍添加成功'
        }
    })
}



module.exports = {
    addBook,
}
