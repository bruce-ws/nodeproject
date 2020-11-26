class AddBook {
    constructor() {
        this.container = $('#listRightCon');
        this.init();
    }
    init() {
        this.writeContent();
        this.upload();
    }
    writeContent() {
        this.container.html(AddBook.template);
    }
    // 文件上传(图片)
    upload(){
        $('#sendBookImg').on('change',this.handleUpload.bind(this));
    }
    handleUpload(){
        let file = $('#sendBookImg')[0].files[0];
        // 上传文件
        // 模拟form表单上传文件  new  formData
        // 说明:  new FileReader 文件转成 base64  dataUrl适合传送小文件

        // 模拟form表单提交
        let formData = new FormData();
        // 将上传的文件通过formData.append() 添加到 formDate中, 第一个参数是key值,第二个参数是value值
        formData.append("booksUrl",file);

        // 通过ajax上传文件
        $.ajax({
            type : 'post',  //上传文件必须  post
            url : '/upload/image',
            cache : false,    //不使用缓存
            processData : false,   //  防止数据传送的过程中对数据类型做修改
            contentType : false,   //  不使用ajax默认的数据类型设置.
            data : formData,  //data后面根 formDate
            success : this.handleUploadSuccess.bind(this)
        })
    }
    handleUploadSuccess(data){
        if(data.data.code == 1){
            let createImg = $('<img>');
            createImg.attr('src',data.data.url);
            $('.bookImg .imgBox').html(createImg);
        }else{
            alert('请重新上传图片')
        }
    }
}
AddBook.template = `
    <section class="addBookBox">
        <form>
            <div class="form-group">
                <label>书籍名称</label>
                <input type="text" class="form-control"">
            </div>
            <div class="form-group">
                <label>书籍作者</label>
                <input type="text" class="form-control"">
            </div>
            <div class="form-group">
                <label>书籍描述</label>
                <textarea class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group">
                <label>书籍类型</label>
                <input type="text" class="form-control"">
            </div>
            <div class="form-group">
                <label>书籍状态</label>
                <select class="form-control">
                    <option>已经完结</option>
                    <option>连载中...</option>
                </select>
            </div>
            <div class="form-group">
                <label>书籍封面</label>
                <div class="bookImg">
                    <span>+</span>
                    <div class="imgBox"></div>
                    <input id="sendBookImg" type="file">
                </div>
            </div>

            <button type="submit" class="btn btn-success">添加书籍</button>
        </form>
    </section>
`