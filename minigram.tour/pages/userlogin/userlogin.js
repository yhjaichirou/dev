var api = require('../../utils/promise.js');
var config = require('../../config.js');
var app = getApp();

Page({
  data: {
    baseUrl: app.globalData.baseUrl,
    phone: "",
    code: "",
  },

  onShow() {
    console.log(app.globalData.userInfo);
    console.log(app.globalData.userDetails);
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },


  bindPhoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  bindCodeInput(e) {
    this.setData({
      code: e.detail.value
    })
  },

  /* 发送验证码 */
  sendAndGetCode(e) {
    var phone = this.data.phone;
    var code = this.data.code;

    var phone = this.data.phone;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'loading',
        duration: 2000
      })
      setTimeout(function() {
        wx.hideToast()
      }, 1000)
      return;
    };

    app.sendVerifyCode(phone, code, function(res) {
      console.log(res);
    });

  },

  formSubmit: function(e) {

    var that = this;
    var userInfo = app.globalData.userInfo;

    var phone = this.data.phone;
    if (!(/^1[34578]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'loading',
        duration: 2000
      })
      setTimeout(function() {
        wx.hideToast()
      }, 1000)
      return;
    };

    app.phoneLogin(e.detail.value.phone, e.detail.value.code, function(userDetails) {
      console.log(userDetails);
    });


  }
})