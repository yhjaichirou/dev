var api = require('../../utils/promise.js');
var config = require('../../config.js');
var app = getApp();


Page({
  data: {
    array: ['中国', '新加坡', '日本', '香港', '韩国', '台湾', '澳门'],
    arrayNum: ['86', '65', '81', '852', '82', '886', '853'],
    index: 0,
    mobile: 0,
    code: "",
    platform: 1, // 代表微信小程序
    openId: ""
  },

  onLoad(options) {

    var that = this;
    app.getUserInfo(function (res, openId) {
      console.log("===== start =======");
      
      console.log(res);
      console.log(openId);

      console.log("===== end =======");
      
      that.setData({
        openId: openId
      });
    });
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },

  bindPickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindMobileInput(e) {
    console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    })
  },

  /**
   * 获取验证码
   */
  bindGetVerification() {
    let that = this
    api.post(api.user.sendCodeUrl, {
      mobile: parseInt(this.data.mobile),
    }).then(res => {
      console.log(res.data)
    })
  },

  /**
   * 下一步
   */
  formSubmit: function(e) {
    console.log(e.detail.value);
        // api.post(config.user.regitserUrl, {
    //   area: parseInt(this.data.arrayNum[this.data.index]),
    //   mobile: parseInt(this.data.mobile),
    //   type: 'sign'
    // }).then(res => {
    //   console.log(res)
    // });
    /**
     * 提交注册
     */
    var that = this;

    api.post(api.user.regitserUrl, {
      phone: that.data.mobile,
      code: that.data.code,
      platform: that.data.platform,
      openId: that.data.openId,
    }).then(res => {
      console.log(res.data)
    })
    
  }
})