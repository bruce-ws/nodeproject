class ArticleControl{
    constructor(){
        this.container = $('#listRightCon');
        this.init();
    }
    init(){
        this.writeContent();
    }
    writeContent(){
        this.container.html(ArticleControl.template);
    }
}
ArticleControl.template = `<h2>文章管理</h2>`