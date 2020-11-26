class UserControl{
    constructor(){
        this.container = $('#listRightCon');
        this.init();
    }
    init(){
        this.writeContent();
    }
    writeContent(){
        this.container.html(UserControl.template);
    }
}
UserControl.template = `<h2>用户管理</h2>`