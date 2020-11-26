
class BookControl{
    constructor(){
        this.container = $('#listRightCon');
        this.init();
    }
    init(){
        this.writeContent();
    }
    writeContent(){
        this.container.html(BookControl.template);
    }
}
BookControl.template = `<h2>书籍管理</h2>`