const config = require("../../../config.js");

const api = require("../../../utils/promise.js");


Page({
  data: {
    mode: "scaleToFill",
    arr: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,

    grids: [{
        icon: "/images/restaurant/icon_wifi.png",
        description: "WI-FI",
      },
      {
        icon: "/images/restaurant/icon_metting.png",
        description: "会议室",
      }, {
        icon: "/images/restaurant/icon_dumbbell.png",
        description: "健身房",
      }, {
        icon: "/images/restaurant/icon_mikephone.png",
        description: "休闲娱乐",
      }
    ],


    showtab: 0, //顶部选项卡索引
    tabnav: {
      tabnum: 3,
      tabitem: [{
          "id": 1,
          "text": "个人"
        },
        {
          "id": 2,
          "text": "团体"
        },
        {
          "id": 3,
          "text": "旅行社"
        }
      ]
    }, //顶部选项卡数据
    ticketTypeAll: [], //所有数据
    ticketType1: [], //数据列表
    ticketType2: [], //数据列表
    ticketType3: [], //数据列表
    startx: 0, //开始的位置x
    endx: 0, //结束的位置x
    critical: 100, //触发切换标签的临界值
    marginleft: 0, //滑动距离

    scenicInfo: {
      title: "",
      subTitle: "",
      settings: [{
        msg: "",
        src: "",
      }, {
        msg: "",
        src: "",
      }, {
        msg: "",
        src: ""
      }],
      comment: {
        score: 0,
        count: 0,
      },
      contact: "",
      address: "",
    },

    hotList: [{
      pic: '/images/mine/add.png ',
      title: '虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师虫师',
      desc: '22W人看過'
    }, {
      pic: '/images/mine/add.png ',
      title: '虫师',
      desc: '22W人看過'
    }, {
      pic: '/images/mine/add.png ',
      title: '虫师',
      desc: '22W人看過'
    }, {
      pic: '/images/mine/add.png ',
      title: '虫师',
      desc: '22W人看過'
    }, {
      pic: '/images/mine/add.png ',
      title: '虫师',
      desc: '22W人看過'
    }]
  },
  onLoad: function() {
    var that = this;
    var array = this.data.arr
    for (let i = 1; i < 3; i++) {
      array.push("http://img14.yiguoimg.com/e/ad/2016/160914/585749449477366062_260x320.jpg")
    }
    this.setData({
      arr: array
    })

    this.fetchTabData(0);
    /**
     * 获取景区信息
     */
    api.post(config.scenicInfoUrl, {}).then(res => {
      that.setData({
        scenicInfo: res.data
      });
    });
  },


  fetchTabData: function(tabAsType) {
    var that = this;
    /**
     * 获取景区门票
     */
    api.get(config.scenicTicketListUrl + "?" + api.json2Form({
      companyId: 1,
      type: tabAsType + 1
    })).then(res => {
      if (tabAsType == 0) {
        that.setData({
          ticketType1: res.data.data
        });
      } else if (tabAsType == 1) {
        that.setData({
          ticketType2: res.data.data
        });
      } else if (tabAsType == 2) {
        that.setData({
          ticketType3: res.data.data
        });
      }
    });
  },
  setTab: function(e) { //设置选项卡选中索引
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: Number(edata.tabindex)
    })
    this.fetchTabData(edata.tabindex);
  },
  scrollTouchstart: function(e) {
    let px = e.touches[0].pageX;
    this.setData({
      startx: px
    })
  },
  scrollTouchmove: function(e) {
    let px = e.touches[0].pageX;
    let d = this.data;
    this.setData({
      endx: px,
    })
    if (px - d.startx < d.critical && px - d.startx > -d.critical) {
      this.setData({
        marginleft: px - d.startx
      })
    }
  },

  /* 进入菜单按钮 */
  enterMenuBtn(e) {
    wx.navigateTo({
      // url: '/pages/restaurant/menu/menu',
      url: '/pages/shop/shop',
    });
  },

  /* 购买须知 */
  buyMustKownTap(e) {
    wx.navigateTo({
      url: '/pages/restaurant/notice/notice',
    });
  },

  xscrollItemTap: function(e) {
    wx.navigateTo({
      url: '/pages/shop/shop',
    });
  },

})