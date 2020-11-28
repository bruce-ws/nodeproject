const bookModel = require('../model/book');
// 添加书籍数据
const addBook = async (req, res, next) => {
    let { bookname, bookauthor, bookdes, booktype, bookstatus, booksimgurl } = req.body;
    let data = await bookModel.bookSave({
        bookname,
        bookauthor,
        bookdes,
        booktype,
        bookstatus,
        booksimgurl
    })
    res.json({
        code: 200,
        errMsg: "",
        data: {
            code: 1,
            info: '书籍添加成功'
        }
    })
}


// 书籍列表渲染
const booksList = async (req, res, next) => {
    let { pagesize, page } = req.body
    let data = await bookModel.bookSearch({
        pagesize,
        page
    })
    // 返回给前端
    res.json({
        code: 200,
        errMsg: '',
        data: {
            code: 1,
            data: data
        }
    })
}

// 书籍总量接口
const booksGroos = async (req, res, next) => {

    let dataCount = await bookModel.bookGroos();

    res.json({
        code: 200,
        errMsg: '',
        data: {
            code: 1,
            info: dataCount
        }
    })
}

// 删除数据
const booksDel = async (req, res, next) => {
    let { _id } = req.query;
    let data = await bookModel.booksDel({ _id });
    // console.log(data);//{ n: 1, ok: 1, deletedCount: 1 }
    if (data.ok == 1) {
        res.json({
            code: 200,
            errMsg: '',
            data: {
                info: '删除成功',
                code: 1,
            }
        })
    } else {
        res.json({
            code: 200,
            errMsg: '',
            data: {
                info: '删除失败',
                code: 0,
            }
        })
    }
}

// 查库
const findBook = async (req, res, next) => {
    let { _id } = req.body
    let data = await bookModel.bookFind(_id);
    if (data) {
        res.json({
            code: 200,
            errMsg: "",
            data: {
                code: 1,
                info: data
            }
        })
    }
}

// 修改
const updataBook = async (req,res,next) => {
    let {_id,bookname,bookauthor,bookdes,booktype,bookstatus} = req.body;
    let bookObj = {
        bookname:bookname,
        bookauthor : bookauthor,
        bookdes : bookdes,
        booktype : booktype,
        bookstatus : bookstatus
    }
    let data = await bookModel.bookUpdata(_id,bookObj);
    if(data.ok == 1){
        res.json({
            code : 200,
            errMsg : '',
            data : {
                code : 1,
                info : '修改成功'
            }
        })
    }else{
        res.json({
            code : 200,
            errMsg : '',
            data : {
                code : 0,
                info : '修改失败'
            }
        })
    }
}

module.exports = {
    addBook,
    booksList,
    booksGroos,
    booksDel,
    findBook,
    updataBook
}
