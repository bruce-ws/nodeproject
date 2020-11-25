class userPage{
    constructor(){
        this.container = $('#user');
        this.init();
    }
    init(){
        this.createContent();
    }
    createContent(flag){
        if(flag){
            this.register = new Register(this.container);
        }else{
            this.login = new Login(this.container);
        }
    }
}

new userPage();