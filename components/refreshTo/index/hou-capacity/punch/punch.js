Page({
    data: {
        dormPunch: [
            {
                "id": 1,
                "floor": "一楼",
                "status": false,
                "remain": 3
            },
            {
                "id": 2,
                "floor": "二楼",
                "status": false,
                "remain": 0
            },
            {
                "id": 3,
                "floor": "三楼",
                "status": false,
                "remain": 5
            },
            {
                "id": 4,
                "floor": "四楼",
                "status": false,
                "remain": 0
            },
            {
                "id": 5,
                "floor": "五楼",
                "status": false ,
                "remain": 0
            },
            {
                "id": 6,
                "floor": "六楼",
                "status": false ,
                "remain": 0
            },
            {
                "id": 7,
                "floor": "七楼",
                "status": false ,
                "remain": 0
            },
        ]
    },
    onLoad() {
        // 根据剩余宿舍是否为零，来判断是否全部完成
        this.data.dormPunch.forEach(e => {
            if(e.remain == 0) {
                e.status = true
            }
        })

        this.setData({
            dormPunch: this.data.dormPunch
        })
    },

    // 跳转到楼层打卡详情页面
    punchDetail(e) {
        // console.log(e.currentTarget.dataset.index);
        // 存储点击的索引
        let index = e.currentTarget.dataset.index
        wx.navigateTo({
          url: '../punchDetail/punchDetail?floor='+this.data.dormPunch[index].floor,
        })
    }
})