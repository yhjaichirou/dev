var api = require('../../utils/promise.js');
var config = require('../../config.js');
var app = getApp();

Page({
  data: {
    userInfo: {},
    userDetails: {},

    items: [{
        icon: '/images/mine/icon_mine_info.png',
        text: '上传人脸信息',
        tips: "待上传",
        path: '/pages/mine/face/face'
      }, {
        icon: '/images/mine/icon_mine_info.png',
        text: '完善信息',
        tips: "用于人脸识别",
        path: '/pages/mine/myinfo/myinfo'
      }, {
        icon: '/images/mine/icon_mine_collection.png',
        text: '我的收藏',
        tips: "",
        path: '/pages/mine/collection/collection'
      },
      {
        icon: '/images/mine/icon_mine_feedback.png',
        text: '问题反馈',
        tips: "",
        path: '/pages/mine/issue/issue'
      },
      {
        icon: '/images/mine/icon_mine_version.png',
        text: '版本信息',
        tips: "",
        path: '/pages/mine/version/version'
      },
      {
        icon: '/images/mine/icon_mine_version.png',
        text: '发起支付',
        tips: "",
        path: '/pages/pay/pay'
      },
    ]
  },

  onLoad: function(options) {
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  onShow: function() {
    wx.setNavigationBarTitle({
      title: '我的'
    });

    this.setData({
      userInfo: app.globalData.userInfo
    });
    console.log(app.globalData.userInfo);
  },

  /* 登出 */
  logout: function(e) {
    var that = this;

    try {
      app.wxLogout(function() {
        wx.showToast({
          title: '退出账号成功',
          icon: 'loading',
          duration: 10000
        })
        setTimeout(function() {
          wx.hideToast();
          wx.switchTab({
            url: '/pages/index/index',
          });
        }, 2000)
      });
    } catch (error) {}
  },

  //跳转到手机登陆
  login: function(e) {
    wx.navigateTo({
      url: '/pages/authorize/authorize',
    });
    // wx.navigateTo({
    //   url: '/pages/userlogin/userlogin',
    // });
  },


  getUserInfo() {
    const userInfo = app.globalData.userInfo

    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
      return
    }

    var that = this;
    app.getUserInfo(function(userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },

  // goMyInfo: function(e) {
  //   wx.navigateTo({
  //     url: '/pages/mine/myinfo/myinfo',
  //   });
  // },
})