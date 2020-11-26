class Login {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init() {
        this.createContent();
        this.createAuthCode();
        this.userRLogin();
    }
    createContent() {
        this.container.html(Login.template);
        $('#userLogin>p').on('click', this.toggleFlag.bind(this));
    }
    toggleFlag() {
        new userPage().createContent(true);
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
        $('.logo_auth_box>svg').remove();
        $('.logo_auth_box').append(data.data);
        this.svgBind();
    }
    // 点击验证码切换
    svgBind(){
        $('.logo_auth_box>svg').on('click',this.handleRenewal.bind(this));
    }
    handleRenewal(){
        this.createAuthCode();
    }
    // 登陆逻辑
    // 注册信息
    userRLogin(){
        $('#userLogin').on('submit',this.handleLoginGetInfo.bind(this));
    }
    handleLoginGetInfo(e){
        e.preventDefault();
        let loginName = $('#userLoginName').val();
        let loginPwd = $('#userLoginPwd').val();
        let loginAuth = $('#userLoginAuth').val();
        // 登陆接口数据请求
        $.ajax({
            method : 'post',
            url :'users/login',
            data : {
                username : loginName,
                password : loginPwd,
                authcode : loginAuth
            },
            success : this.handleLoginCb.bind(this)
        })
    }
    handleLoginCb(data){
        if(data.data.code == 1){
            alert('登陆成功');
            location.href= "http://127.0.0.1:3000/html/list.html"
        }else{
            alert(data.data.info);
        }
    }
}
Login.template = `
<div id="login">
<form id="userLogin">
    <h1><img src="./img/logo.gif" alt=""></h1>
    <div class="form-group">
        <label>User:</label>
        <input type="text" placeholder="Please enter the user name" class="form-control"
            autocomplete="off" id="userLoginName">
    </div>
    <div class="form-group">
        <label>Password:</label>
        <input type="text" class="form-control" placeholder="Please enter the password" id="userLoginPwd">
    </div>
    <div class="form-group">
        <label>Auth code:</label>
        <div class="logo_auth_box auth_box"><input id="userLoginAuth" type="text" class="form-control"></div>
    </div>
    <p class="text-danger">没有账号？立即注册</p>
    <button type="submit " class="btn btn-primary">Sign in</button>
</form>
</div>
`