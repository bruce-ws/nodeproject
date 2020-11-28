// 连接数据库
const { booksList } = require("../controller/book");
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

// 查找数据 分页
const bookSearch = (booksInfo) => {
    return books.find().skip((booksInfo.page-1) * booksInfo.pagesize).limit(Number(booksInfo.pagesize))
}

// 查找书籍总量
const bookGroos = () => {
    return books.find().count();
}


// 删除数据
const booksDel = (_id) => {
    return books.remove({_id});
}
//查库
const bookFind = (_id) => {
    return books.findOne({_id});
}

// 修改数据
const bookUpdata = (_id,booksInfo) => {
    return books.update({
        _id
    },{
     $set : booksInfo   
    })
}
module.exports = {
    bookSave,
    bookSearch,
    bookGroos,
    booksDel,
    bookFind,
    bookUpdata
}




