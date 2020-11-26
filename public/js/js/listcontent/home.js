class Home{
    constructor(){
        this.container = $('#listRightCon');
        this.init();
    }
    init(){
        this.writeContent();
    }
    writeContent(){
        this.container.html(Home.template);
    }
}
Home.template = `<h2>首页</h2>`