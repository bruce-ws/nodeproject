class Register {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init() {
        this.createContent();
    }
    createContent() {
        this.container.html(Register.template);
        $('#userRegister>p').on('click',this.toggleFlag.bind(this));
    }
    toggleFlag(){
        new userPage().createContent(false);
    }
    // 验证码
    createAuthCode(){
        $.ajax({
            url : '/users/authcode',
            method : 'get',
            success : this.getAuthCode.bind(this)
        })
    }
    getAuthCode(data){
        // console.log(data);
        $('.auth_box>svg').remove();
        $('.auth_box').append(data.data);
        this.svgBind();
    }
    // 点击验证码切换
    svgBind(){
        $('.auth_box>svg').on('click',this.handleRenewal.bind(this));
    }
    handleRenewal(){
        this.createAuthCode();
    }
}
Register.template = `
<div id="register">
            <form id="userRegister">
                <h1><img src="./img/logo.gif" alt=""></h1>
                <div class="form-group">
                    <label>User:</label>
                    <input type="email" placeholder="Please enter the user name" class="form-control"
                        autocomplete="off">
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input type="text" class="form-control" placeholder="Please enter the password">
                </div>
                <div class="form-group">
                    <label>Auth code:</label>
                    <div class="auth_box"><input type="text" class="form-control"></div>
                    
                </div>
                <p class="text-danger">已有账号？立即登陆</p>
                <button type="submit " class="btn btn-primary">Sign up</button>
            </form>
        </div>
`