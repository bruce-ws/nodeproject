class Myself{
    constructor(){
        this.container = $('#listRightCon');
        this.init();
    }
    init(){
        this.writeContent();
    }
    writeContent(){
        this.container.html(Myself.template);
    }
}
Myself.template = `<h2>个人中心</h2>`