const { requestThree } = require('../../../../../../utils/request')
const app = getApp();
const address = {
    图书馆: ['8楼', '9楼', '10楼', '11楼', '12楼'],
    廊桥书院: ['1楼', '2楼', '3楼'],
    爱莲书院: ['1楼', '2楼'],
    汇江书院: ['1楼', '2楼', '3楼', '4楼']
};
Page({

    /**
     * 页面的初始数据
     */
    data: {
        columns: [
            {
                values: Object.keys(address),
                className: 'column1',
            },
            {
                values: address['图书馆'],
                className: 'column2',
                defaultIndex: 2,
            },
        ],
        show: false, // 弹出层的显示与隐藏
        addressObj: {},
        hiddenMask: true, // 控制遮罩层是否隐藏
        seatingsObj: {
            1:[1,1,1,1,1,1,1,0,1,1,1,1,1,1],
            2: [0,1,1,1,1,1,0,1,1,1,1,1,1,1],
            3: [0,1,1,1,0,1,1,1,1,1,1,1,1,1],
            4: [1,1,1,1,1,1,1,1,1,0,1,1,1,1],
            5: [1,1,1,1,0,1,1,1,1,1,1,0,1,1],
            6: [0,1,1,1,1,1,1,1,1,1,1,0,1,1],
        }, // 0表示不能选 1表示可以选 2表示正在选择 3表示已经预约成功
        row: '0', // 排数
        seatNum: -1, // 座位号
        isTap: false // 预约按钮是否可以被点击
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取初始用户选择的地址
        let obj = {};
        Object.assign(obj, app.globalData.seatObj);
        this.setData({
            addressObj: obj
        });
    },
    // 获取座位号
    getSeatNum(e) {
        let num = e.currentTarget.dataset.index;
        this.setData({
            seatNum: num
        })
    },
    // 获取排数
    getSeatRow(e) {
        let row = e.currentTarget.dataset.index;
        let newSeatingsObj = this.data.seatingsObj;
        this.setData({
            row
        });
        // 判断该座位是否能够使用
        if(newSeatingsObj[row][this.data.seatNum] == 0) {
            wx.showToast({
                title: '该座位已有人',
                icon: 'error',
                mask: true
            })
        }else {
            let key = 1;
            // 只能预约一个座位的实现,将2变成1
            for(let k in newSeatingsObj) {
                newSeatingsObj[k].forEach(item => {
                    if(item == 2) {
                        key = k;
                    }
                })
            }
            // 注意此处要重新给该数组赋值
            newSeatingsObj[key] = newSeatingsObj[key].map(item => {
                if(item == 2) {
                    return 1;
                }else {
                    return item;
                }
            })
            // 最终选择的座位
            newSeatingsObj[row][this.data.seatNum] = 2;
            this.setData({
                seatingsObj: newSeatingsObj
            });
        }

    },
    // 确认该座位
    confirm() {
        // 测试，发送请求
        let floor = this.data.addressObj.floor;
        let row = this.data.row;
        let seatNum = this.data.seatNum;
        wx.request({
            url: 'https://alaskaboo.cn/library/check',
            method: 'POST',
            data: {
                floor,
                row,
                seatNum
            },
            success(data) {
                console.log(data);
            }
        })


        if(this.data.seatNum == -1) {
            wx.showToast({
                title: '请选择座位！',
                icon: 'error',
                mask: true
            })
        }else { // 预约成功
            let seatingsObj = this.data.seatingsObj;
            seatingsObj[this.data.row][this.data.seatNum] = 3;
            this.setData({
                seatingsObj
            });
            let obj = {};
            let row = this.data.row;
            let seatNum = this.data.seatNum;
            Object.assign(obj, this.data.addressObj, {row, seatNum});
            app.globalData.seatObj = obj;
            // 不允许用户再次点击座位图（加一个遮罩层），除非取消预约
            this.setData({
                hiddenMask: false
            });
            // 预约按钮设为禁用状态
            this.setData({
                isTap: true
            })
            wx.showToast({
                title: '预约成功！',
                icon: 'success',
                mask: true
            })
        }
    },
    // 取消预约
    cancel() {

    },
    warnUser() {
        wx.showModal({
            title: '您已预约成功',
            content: '只能预约一个座位，取消预约后才能再次操作',
            success (res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })


    },
    onChange(event) {
        const { picker, value, index } = event.detail;
        picker.setColumnValues(1, address[value[0]]);
        const obj = {
            place: value[0],
            floor: value[1]
        }
        this.setData({
            addressObj: obj
        })
    },
    showPopup() {
        this.setData({ show: true });
    },

    onClose() {
        this.setData({ show: false });
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
})