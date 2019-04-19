Page({
  onShareAppMessage() {
    return {
      title: '扫码',
      path: '/pages/scan-code/scan-code'
    }
  },

  data: {
    result: ''
  },

  scanCode() {
    const that = this
    wx.scanCode({
      success(res) {
        that.setData({
          result: res.result
        })
      },
      fail() {}
    })
  }
})
