// pages/log/log.js
const {requestTwo} = require("../../utils/request")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sel_pass: false,
        sel_number: false,
        // 账号
        number: '',
        // 密码
        pass: '',
        show: 0,
        // 登录凭证
        userCode: "",
        // 不同身份类型
        userType: ""
    },
    // #region
    onLoad() {
      var that = this
        // 获取登录凭证code
        wx.login({
            success(res) {
                that.setData({
                    userCode: res.code
                })
            }
        })
        // console.log(this.data.userCode);

    },
    // #region 
    //获取焦点
    bindfocus (e) {
        let type = e.currentTarget.dataset.type;
        let val = e.detail.value;
        this.setData({
            sel_number: type == 1 ? true : false,
            sel_pass: type == 2 ? true : false,
            show: val != '' ? type : 0,
        })
    },
    //失去焦点
    bindblur () {
        let that = this;
        that.setData({
            sel_pass: false,
            sel_number: false,
            show: 0
        })
    },
    // 获取用户输入值
    bindNumber(e) {
        // console.log(e.detail);
        this.setData({
            number: e.detail.value
        })
    },
    bindPass(e) {
      // console.log(e.detail);
      this.setData({
          pass: e.detail.value
      })
    },
    // #endregion
    // 登录按钮
    login() {
        // console.log(1);
        const app =getApp();
        var that = this
        wx.request({
            url : "https://alaskaboo.cn/login",
            method: "POST",
            data: {
                username : that.data.number,
                password : that.data.pass,
                code: JSON.stringify(that.data.userCode)
            },
            header: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function (res) {
                // 判断是否登录成功的标识
                let loginStatus = res.data.flag
                // 账号密码不能为空
                if(that.data.number == "" || that.data.pass == "" ) {
                    wx.showToast({
                        title: '账号或密码为空',
                        icon: 'error'
                    });
                // 判断登录状态
                }else if(loginStatus) {
                    // 登录成功,拿到用户的登录信息
                    // 用来标识不同权限用户
                    let userType = res.data.data.currentUser.userType;
                    let userId = res.data.data.currentUser.id
                    let userAccount = res.data.data.currentUser.account
                    console.log(res.data.data.currentUser);
                    // 将用户的id存入缓存，方便其他页面调用
                    wx.setStorage({
                        key: 'logInfo',
                        data: {
                            userType: userType,
                            userId: userId,
                            userAccount: userAccount
                        }
                    })
                    that.setData({
                        // 获取登录用户的身份类型
                        userType: res.data.data.currentUser.userType
                    })
                    let inputNum = that.data.userType
                    // 后端传来当前用户的类型ID，则展示不同页面
                    if(inputNum == 4) {
                        that.stuLoginAll();
                    } else if(inputNum == 5) {
                        that.comLoginAll();
                    } else if(inputNum == 2) {
                        that.couLoginAll()
                    }else if(inputNum == 3){
                        that.houLoginAll()
                    }
                    // 请求用户权限
                    // 获取用户头像,当用户数据已经在缓存中时，不再请求权限，直接展示
                    if(!app.globalData.hasUserInfo) {
                        wx.getUserProfile({
                            desc: '获取用户头像', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
                            success: (res) => {
                                that.setData({
                                    userInfo: res.userInfo,
                                })
                                app.globalData.hasUserInfo = true
                                // 将获取的用户数据存入缓存，避免用户再次登入小程序时重复弹窗 
                                res.userInfo.avatarUrl = 'https://thirdwx.qlogo.cn/mmopen/vi_32/G1ZzPMHc2vUb1k1A5NqBTlHOLnBealCjme3Libj4OIoRKTQVNjzgBBk1aTdLF26icyI52YZdYk9R1GfRLC085Hvw/132'
                                wx.setStorage({
                                    key: 'userInfo',
                                    data: res.userInfo,
                                })
                            }
                        })
                    }
                }else if(!loginStatus) {
                    wx.showToast({
                      title: '账号或密码错误',
                      icon: 'error'
                    })
                }
               
            },
            fail: function (err) {
                wx.showModal({
                    title: '提示',
                    content: err,
                })
                console.log(err);
            }
        })
    },

    // 不同用户展示不同页面
    // 学生登录时的页面
    // 可以在一个按钮上绑定多个点击函数
    stuLoginAll() {
        var that = this
        that.stuLogin()
    },
    stuLogin() {
        const app = getApp();
        app.globalData.isStu = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    
    //班委登录时的页面
    comLoginAll() {
        var that = this
        that.comLogin()
    },
    comLogin() {
        const app = getApp();
        app.globalData.isCom = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    // 辅导员登录时的页面
    couLoginAll() {
        var that = this
        that.couLogin()
    },
    couLogin() {
        const app = getApp();
        app.globalData.isCou = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    // 宿管登录时的页面
    houLoginAll() {
        var that = this
        that.houLogin()
    },
    houLogin() {
        const app = getApp();
        app.globalData.isHou = true;
        wx.switchTab({
            url: '/pages/index/index',
        })
    }
})