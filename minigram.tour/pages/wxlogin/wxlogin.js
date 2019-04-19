const app = getApp()
Page({
  onShareAppMessage() {
    return {
      title: '微信登录',
      path: '/pages/wxlogin/wxlogin'
    }
  },

  onLoad() {
    this.setData({
      hasLogin: app.globalData.hasLogin
    })
  },
  data: {},
  login() {
    const that = this
    wx.login({
      success() {
        app.globalData.hasLogin = true
        that.setData({
          hasLogin: true
        })
      }
    })
  }
})
