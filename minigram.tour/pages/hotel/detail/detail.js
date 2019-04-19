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


    placeInfo: {
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

    companyId: "",

  },
  onLoad: function(options) {
    var that = this;

    this.setData({
      companyId: options.companyId
    });

    console.log(options.companyId);

    // api.post(config.hotelBannerUrl, {}).then(res => {
    //   var arr = [];
    //   for (let i = 0; i < res.data.length; i++) {
    //     arr.push(res.data[i].img)
    //   }
    //   that.setData({
    //     arr: arr
    //   });
    // });

    this.fetchData();
    /**
     * 获取地点信息
     */
    // api.post(config.hotelInfoUrl, {}).then(res => {
    //   that.setData({
    //     placeInfo: res.data
    //   });
    // });

    api.post(config.hotel.hotelRoomAllUrl, {
      pageNum: 0,
      pageSize: 100,
      restaurantId: that.data.companyId
    }).then(res => {
      console.log(res);
      that.setData({
        placeInfo: res.data.content
      });
    });
  },

  fetchData: function() {
    var that = this;
    api.post(config.hotel.hotelRoomAllUrl, {
      pageNum: 0,
      pageSize: 100,
      hotelId: that.data.companyId
    }).then(res => {
      console.log(res);

      that.setData({
        hotelList: res.data
      });
    });
  },

  /* 购买须知按钮 */
  buyMustKownTap(e) {
    wx.navigateTo({
      url: '/pages/hotel/notice/notice',
    });
  },

  /* 预定按钮 */
  appointBtn(e) {
    wx.navigateTo({
      url: '/pages/hotel/appoint/appoint',
    });
  },


})