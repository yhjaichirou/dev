const config = require('../../config.js')

var MD5Util = require('../../utils/md5.js');

const app = getApp()
Page({
  data: {},

  wxPay: function(e) {
    var code = '' //传给服务器以获得openId
    var timestamp = String(Date.parse(new Date())) //时间戳
    var nonceStr = '' //随机字符串，后台返回
    var prepayId = '' //预支付id，后台返回
    var paySign = '' //加密字符串

    //获取用户登录状态
    wx.login({
      success: function(res) {
        if (res.code) {
          code = res.code
          //发起网络请求,发起的是HTTPS请求，向服务端请求预支付
          wx.request({
            url: config.requestPaymentUrl,
            data: {
              code: res.code
            },
            success: function(res) {
              if (res.data.result == true) {
                nonceStr = res.data.nonceStr
                prepayId = res.data.prepayId
                // 按照字段首字母排序组成新字符串
                var payDataA = "appId=" + app.globalData.appId + "&nonceStr=" + res.data.nonceStr + "&package=prepay_id=" + res.data.prepayId + "&signType=MD5&timeStamp=" + timestamp;
                var payDataB = payDataA + "&key=" + app.globalData.key;
                // 使用MD5加密算法计算加密字符串
                paySign = MD5Util.MD5(payDataB).toUpperCase();
                // 发起微信支付
                wx.requestPayment({
                  'timeStamp': timestamp,
                  'nonceStr': nonceStr,
                  'package': 'prepay_id=' + prepayId,
                  'signType': 'MD5',
                  'paySign': paySign,
                  'success': function(res) {
                    // 保留当前页面，跳转到应用内某个页面，使用wx.nevigeteBack可以返回原页面
                    wx.navigateTo({
                      url: '/pages/pay/payed'
                    })
                  },
                  'fail': function(res) {
                    console.log(res.errMsg)
                  }
                })
              } else {
                console.log('请求失败' + res.data.info)
              }
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },

})