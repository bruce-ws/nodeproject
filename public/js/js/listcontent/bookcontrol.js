
class BookControl {
    constructor() {
        this.container = $('#listRightCon');
        this.init();
    }
    init() {
        this.writeContent();
        this.booksDateRender(5, 1);
        this.getBooksGross();
        this.delBook();
        this.bookUpdataRun();
    }
    writeContent() {
        this.container.html(BookControl.template);
    }
    // 图书数据渲染
    booksDateRender(pagesize, page) {
        // 发起ajax请求数据
        $.ajax({
            method: 'post',
            url: '/book/bookslist',
            data: {
                pagesize,
                page
            },
            success: this.handleBooksRender.bind(this)
        })
    }
    handleBooksRender(data) {
        // 数据渲染
        let booksDate = data.data.data;
        let tempStr = ""
        for (var i = 0, k = booksDate.length; i < k; i++) {
            tempStr += `
            <tr>
                <td class="book_name">《${booksDate[i].bookname}》</td>
                <td>${booksDate[i].bookauthor}</td>
                <td><img src="${booksDate[i].booksimgurl}"></td>
                <td>${booksDate[i].booktype}</td>
                <td class="book_status">${booksDate[i].bookstatus}</td>
                <td data-id="${booksDate[i]._id}">
                    <button type="button" class="btn btn-primary amendBook" data-toggle="modal" data-target="#myModal">修改</button>
                    <button type="button" class="btn btn-danger delBook">删除</button>
                </td>
            </tr>
            `
        }
        $("#bookList>tbody").html(tempStr);
    }
    // 得到数据总量
    getBooksGross() {
        $.ajax({
            method: 'post',
            url: '/book/booksgroos',
            success: this.handleGetBooksGross.bind(this)
        })
    }
    handleGetBooksGross(data) {
        // 总数 data.data.info
        let booksGross = data.data.info;
        this.paging(booksGross);
    }

    // 分页
    paging(bookscount) {
        let _this = this
        layui.use('laypage', function () {
            var laypage = layui.laypage;
            //执行一个laypage实例
            laypage.render({
                elem: 'pageBtn', //注意，这里的 test1 是 ID，不用加 # 号
                count: bookscount, //数据总数，从服务端得到
                limit: 5,
                groups: 5,
                jump: _this.jumpPage.bind(_this)
            });
        });
    }
    jumpPage(obj, first) {
        if (!first) {
            this.booksDateRender(obj.limit, obj.curr);
        }
    }

    // 删除 修改  书籍
    delBook() {
        $('#bookList').on('click', this.handleDelBook.bind(this));
    }
    handleDelBook(e) {
        // 获取  数据Id
        let classname = e.target.className
        let tagname = e.target.tagName
        if (tagname == 'BUTTON') {
            let _id = e.target.parentNode.getAttribute('data-id');
            if (classname == 'btn btn-danger delBook') {
                // 删除业务逻辑
                this.delbookRun(_id)
            } else if (classname == 'btn btn-primary amendBook') {
                // 修改业务逻辑
                // console.log('修改')
                this.amendBookRun(_id);
            }
        }
    }
    // 删除数据逻辑
    delbookRun(_id) {
        $.ajax({
            method: 'get',
            url: "/book/delbook",
            data: {
                _id
            },
            success: this.handleDelbookRun.bind(this)
        })
    }
    handleDelbookRun(data) {
        // console.log(data);
        if (data.data.code == 1) {
            alert('删除成功');
            // 重新渲染数据
            new BookControl();
        } else {
            alert(data.data.info);
        }
    }
    // 修改数据逻辑
    amendBookRun(_id) {
        // 给_id做保存,用来修改数据
        $('#amendBookForm .saveId').val(_id);
        // 根据Id  获取后端数据
        $.ajax({
            method: 'post',
            url: '/book/findbook',
            data: {
                _id,
            },
            success: this.handleGetBookById.bind(this)
        })
    }
    handleGetBookById(data) {
        // 拿到当前要修改的数据
        $('#amendBookForm .bookname').val(data.data.info.bookname);
        $('#amendBookForm .bookauthor').val(data.data.info.bookauthor);
        $('#amendBookForm .bookdes').val(data.data.info.bookdes);
        $('#amendBookForm .booktype').val(data.data.info.booktype);
        $('#amendBookForm .bookstatus').val(data.data.info.bookstatus);

    }
    
    // 执行修改
    bookUpdataRun() {
        $('.modal-footer .btnUpdata').on('click', this.handleUpdata.bind(this));
    }
    handleUpdata() {
        let 
            _id = $('#amendBookForm .saveId').val(),
            bookname = $('#amendBookForm .bookname').val(),
            bookauthor = $('#amendBookForm .bookauthor').val(),
            bookdes =  $('#amendBookForm .bookdes').val(),
            booktype = $('#amendBookForm .booktype').val(),
            bookstatus = $('#amendBookForm .bookstatus').val();
        // ajax请求修改数据接口
        $.ajax({
            method : 'post',
            url : '/book/updatabook',
            data : {
                _id,
                bookname,
                bookauthor,
                bookdes,
                booktype,
                bookstatus
            },
            success : this.handleUpdateBook.bind(this)
        })
    }
    handleUpdateBook(data){
        if(data.data.code == 1){
            alert('修改成功');
            // 重新渲染数据
            new BookControl();
        }else{
            alert(data.data.info);
        }
    }
}
BookControl.template = `
    <section id="bookControl">
        <table id="bookList" class="table table-striped">
            <thead>
                <tr>
                    <th width="200">书籍名称</th>
                    <th width="150">作者</th>
                    <th>书籍封面</th>
                    <th width="150">书籍类型</th>
                    <th width="150">书籍状态</th>
                    <th>管理书籍</th>
                </tr>
            </thead>
            <tbody>
                
            </tbody>
        </table>

        <div id="pageBtn"></div>
    </section>
`

