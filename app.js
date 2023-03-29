//app.js
App({
    onLaunch: function () {
    },
    globalData: {
        // 用户信息
        userInfo: {},
        hasUserInfo: false,
        // 不同权限用户标识
        user: "",
        stu: 0,
        com: 1,
        cou: 2,
        hou: 3,
        // 控制不同用户展示不同页面
        isStu: false,
        isCou: false,
        isHou: false,
        list:[], //存放tabBar的数据

        // 用户上传图片
        imgSrc: "",
        index: "",
        // 是否打卡
        isPunch: false,
        // 当前位置信息
        current_address: '',
        // 具体座位
        seatObj: {}
    },

})