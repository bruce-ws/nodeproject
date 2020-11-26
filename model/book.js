// 连接数据库
const mongoose = require("../utils/database");
// 限制表字段类型
const Schema = mongoose.Schema;
let bookSchema = new Schema({
    bookname : String,
    bookauthor : String,
    bookdes : String,
    booktype : String,
    bookstatus : String,
    booksimgurl : String
})

// 创建表
const books = mongoose.model("books",bookSchema);

// 增加数据
const bookSave = (booksIofo) => {
    let book = new books(booksIofo);
    return book.save();
}


module.exports = {
    bookSave,
}




