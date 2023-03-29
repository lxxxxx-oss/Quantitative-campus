// components/refreshTo/index/hou-capacity/bed/detailBed/detailBed.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 用户查看的寝室
        currentRoom: {},
        // 所有寝室信息
        dormEmpty: [],
        // 是否有该床位，颜色区分，默认为红色（没有）
        bg1: "#b54036",
        bg2: "#b54036",
        bg3: "#b54036",
        bg4: "#b54036",
        bg5: "#b54036",
        bg6: "#b54036",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 寝室号
        wx.setNavigationBarTitle({
            title: this.options.roomId+"床位详情"
        })
        // 获取所有寝室信息并筛选出之前用户点击的寝室
        this.setData({
            dormEmpty: JSON.parse(wx.getStorageSync('dormEmpty'))
        })
        // 筛选出用户点击的寝室
        let currentRoom = this.data.dormEmpty.filter(item => item.doors == options.roomId);
        this.setData({
            currentRoom: currentRoom[0]
        })
        // 判断每一个床位是否有人对应的颜色
        this.data.currentRoom.empty.forEach((item) => {
            switch (item) {
                case 1:
                    this.setData({
                        bg1: '#4BB5E9'
                    });
                    break;
                case 2:
                    this.setData({
                        bg2: '#4BB5E9'
                    });
                    break;
                case 3:
                    this.setData({
                        bg3: '#4BB5E9'
                    });
                    break;
                case 4:
                    this.setData({
                        bg4: '#4BB5E9'
                    });
                    break;
                case 5:
                    this.setData({
                        bg5: '#4BB5E9'
                    });
                    break;
                case 6:
                    this.setData({
                        bg6: '#4BB5E9'
                    });
                    break;
            }
        })
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