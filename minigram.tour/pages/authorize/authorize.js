var api = require('../../utils/promise.js');
var config = require('../../config.js');
var app = getApp();

Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    userInfo: {
      nickName: "",
      avatarUrl: "",
      province: "",
      city: ""
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {
    
  },

  onShow:function(){
    var that = this;
    that.setData({
      userInfo: app.globalData.userInfo
    });
  },

  bindGetUserInfo: function(e) {
    var that = this;
    var userInfo = this.data.userInfo;

    app.wxLogin(userInfo,function(res){
      console.log(res.data.data);
    });

  },


})