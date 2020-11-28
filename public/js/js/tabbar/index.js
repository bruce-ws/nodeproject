class Tabbar {
    constructor() {
        this.liBtn = $('#listLeftBar>li');
        this.init();
    }
    init() {
        this.liClickBind();
        this.handleTabBar(2);
    }
    liClickBind() {
        this.liBtn.each(this.handleEventBind.bind(this));
    }
    handleEventBind(index) {
        this.liBtn.eq(index).on('click', this.handleTabBar.bind(this, index));
    }
    handleTabBar(index) {
        this.liBtn.eq(index).addClass('active').siblings().removeClass('active');
        switch (index) {
            case 0:
                new Home();
                break;
            case 1:
                new AddBook();
                break;
            case 2:
                new BookControl();
                break;
            case 3:
                new UserControl();
                break;
            case 4:
                new ArticleControl()
                break;
            case 5:
                new Myself();
                break;
        }
    }
}
new Tabbar();