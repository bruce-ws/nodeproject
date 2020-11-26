class Register {
    constructor(container) {
        this.container = container;
        this.init();
    }
    init() {
        this.createContent();
        this.createAuthCode();
        this.userRegister();
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
        $('.reg_auth_box>svg').remove();
        $('.reg_auth_box').append(data.data);
        this.svgBind();
    }
    // 点击验证码切换
    svgBind(){
        $('.reg_auth_box>svg').on('click',this.handleRenewal.bind(this));
    }
    handleRenewal(){
        this.createAuthCode();
    }

    // 注册信息
    userRegister(){
        $('#userRegister').on('submit',this.handleRegGetInfo.bind(this));
    }
    handleRegGetInfo(e){
        e.preventDefault();
        let regName = $('#userRegName').val();
        let regPwd = $('#userRegPwd').val();
        let regAuth = $('#userRegAuth').val();
        // 注册接口数据请求
        $.ajax({
            method : 'post',
            url :'users/register',
            data : {
                username : regName,
                password : regPwd,
                authcode : regAuth
            },
            success : this.handleRegCb.bind(this)
        })
    }
    handleRegCb(data){
        if(data.data.code == 1){
            alert('注册成功，请登陆');
            new userPage().createContent(false);
        }else{
            alert(data.data.info);
        }
    }
}
Register.template = `
<div id="register">
            <form id="userRegister">
                <h1><img src="./img/logo.gif" alt=""></h1>
                <div class="form-group">
                    <label>User:</label>
                    <input type="text" id="userRegName" placeholder="Please enter the user name" class="form-control" autocomplete="off">
                </div>
                <div class="form-group">
                    <label>Password:</label>
                    <input type="text" id="userRegPwd" class="form-control" placeholder="Please enter the password">
                </div>
                <div class="form-group">
                    <label>Auth code:</label>
                    <div class="reg_auth_box auth_box" ><input type="text" class="form-control" id="userRegAuth"></div>
                    
                </div>
                <p class="text-danger">已有账号？立即登陆</p>
                <button type="submit " class="btn btn-primary">Sign up</button>
            </form>
        </div>
`