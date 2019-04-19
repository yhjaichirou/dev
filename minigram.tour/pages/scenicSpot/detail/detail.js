const config = require("../../../config.js");
const api = require("../../../utils/promise.js");
const jsonUtil = require("../../../utils/jsonUtil.js");
const app = getApp();

Page({
  data: {
    mode: "scaleToFill",

    //
    banners: [],

    //附近景点相关 start ============
    address: "",
    arrays: [],

    commentArrays: [],

    limit: 10,
    currentPage: 0,
    commentCurrentPage: 0,
    //附近景点相关 end ============

    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,

    /* 当前票类型(顶部选项卡索引) */
    showtab: 0,


    isCollect: false,

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


    companyId: "",

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
    }
  },
  onLoad: function(options) {

    this.setData({
      companyId: options.companyId,
      address: app.globalData.currentAddress
    });
  },

  onShow: function() {
    var that = this;


    /**
     * 获取景区信息
     */
    api.post(config.scenicInfoUrl, {
      companyId: that.data.companyId
    }).then(res => {
      that.setData({
        scenicInfo: res.data,
        banners: [res.data.photo]
      });

      that.fetchTabData(0);
    });

    this.fetchMoreComment();
    this.fetchMore();
  },

  //收藏/取消收藏
  collectOrNot: function() {
    var that = this;
    console.log("收藏");
    var isCollect = !this.data.isCollect;
    this.setData({
      isCollect: isCollect
    });
  },

  fetchTabData: function(tabAsType) {
    var that = this;
    /**
     * 获取景区门票
     */
    api.get(config.scenicTicketListUrl + "?" + api.json2Form({
      companyId: that.data.companyId,
      type: tabAsType + 1
    })).then(res => {


      if (res.data.code == 0) {
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
      } else {
        that.setData({
          ticketType1: [],
          ticketType2: [],
          ticketType3: [],
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
  scrollTouchend: function(e) {
    // let d = this.data;
    // if (d.endx - d.startx > d.critical && d.showtab > 0) {
    //   this.setData({
    //     showtab: d.showtab - 1,
    //   })
    // } else if (d.endx - d.startx < -d.critical && d.showtab < this.data.tabnav.tabnum - 1) {
    //   this.setData({
    //     showtab: d.showtab + 1,
    //   })
    // }
    // this.fetchTabData(d.showtab);
    // this.setData({
    //   startx: 0,
    //   endx: 0,
    //   marginleft: 0
    // })
  },

  /* 预定按钮 */
  appointBtn(e) {
    var that = this;

    // console.log(e.currentTarget.dataset.surplus);
    console.log(that.data.scenicInfo);
    var surplus = e.currentTarget.dataset.surplus;
    wx.navigateTo({
      // url: '/pages/scenicSpot/appoint/appoint',
      url: '../ticket/ticket?' + jsonUtil.json2Form({
        companyId: that.data.companyId,
        type: that.data.showtab,
        surplus: surplus,
        name: that.data.scenicInfo.name
      }),
    });
  },

  /* 购买须知 */
  buyMustKownTap(e) {
    wx.navigateTo({
      url: '/pages/scenicSpot/notice/notice',
    });
  },


  fetchMoreComment() {
    var that = this;

    var page = that.data.commentCurrentPage + 1;
    that.setData({
      commentCurrentPage: page
    });

    api.get(config.scenicCommentListUrl + "?" + api.json2Form({
      companyId: that.data.companyId
    })).then(res => {
      console.log(res.data);
      that.setData({
        commentArrays: that.data.commentArrays.concat(res.data.content)
      });
    })
  },


  /*======================= 附近景点部分 start ======================= */
  fetchMore() {
    var that = this;
    var limit = that.data.limit;
    var page = that.data.currentPage + 1;
    var city = app.globalData.currentAddress;
    that.setData({
      currentPage: page
    });

    api.post(config.scenicListUrl, {
      limit: limit,
      page: page,
      city: city,
    }).then(res => {
      that.setData({
        arrays: that.data.arrays.concat(res.data)
      });
    })
  }

  /*======================= 附近景点部分 end ======================= */

})