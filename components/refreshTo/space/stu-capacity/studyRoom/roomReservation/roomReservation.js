const app = getApp();
Page({
    data: {
        text: "欢迎使用自习室座位预约系统，使用前请认真阅读注意事项",
        step: 1, // 滚动速度
        distance: 0, // 初始滚动距离
        space: 0,
        interval: 50, // 时间间隔
        date: '', // 选择日期
        timeArr: [
            '08:00-12:00',
            '13:00-16:00',
            '16:00-18:00',
            '18:00-20:00',
            '20:00-22:00',
            '22:00-23:00',
        ], // 时间
        time: '',
        seatInfo: {}, // 座位信息
    },
    getTime(e) {
        let index = e.currentTarget.dataset.index;
        let time = this.data.timeArr[index];
        this.setData({
            time
        })
    },
    toRulePage() {
        wx.navigateTo({
            url: "/components/refreshTo/space/stu-capacity/studyRoom/rules/rules",
        })
    },
    scrollling() {
        var that = this;
        var length = that.data.length; // 滚动文字的宽度
        var windowWidth = that.data.windowWidth; // 屏幕宽度
        var interval = setInterval(function() {
            var maxscrollwidth = length + that.data.space;
            var left = that.data.distance;
            if (left < maxscrollwidth) { // 判断是否滚动到最大宽度
                that.setData({
                    distance: left + that.data.step
                })
            } else {
                that.setData({
                    distance: 0 // 直接重新滚动
                });
                clearInterval(interval);
                that.scrollling();
            }
        }, that.data.interval);
    },

    bindDateChange(e) {
        let date = e.detail.value;
        let arr = date.split('');
        arr[4] = '年';
        arr[7] = '月';
        arr[10] = '日';
        date = arr.join('');
        this.setData({
            date
        });
    },
    goSeatePage() {
        wx.navigateTo({
            url: '/components/refreshTo/space/stu-capacity/studyRoom/seat/seat'
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        this.setData({
            date: year + '-' + month + '-' + day
        });


    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        var that = this;
        var query = wx.createSelectorQuery();
        // 选择id
        query.select('#mjltest').boundingClientRect();
        query.exec(function(res) {
            var length = res[0].width;
            var windowWidth = wx.getSystemInfoSync().windowWidth; // 屏幕宽度
            that.setData({
                length: length,
                windowWidth: windowWidth,
                space:windowWidth
            });
            that.scrollling(); // 第一个字消失后立即从右边出现
        });

        // 已选座信息
        let seatInfo = {};
        Object.assign(seatInfo, app.globalData.seatObj);
        this.setData({
            seatInfo
        })
        console.log(Object.keys(this.data.seatInfo).length)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})