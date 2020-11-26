class AddBook{
    constructor(){
        this.container = $('#listRightCon');
        this.init();
    }
    init(){
        this.writeContent();
    }
    writeContent(){
        this.container.html(AddBook.template);
    }
}
AddBook.template = `<h2>添加书籍</h2>`