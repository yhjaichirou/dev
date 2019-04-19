// templates/swipercard/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icons: [
      [{
          id: 1,
          img: '/images/index/icon_scene.png',
          name: '景区',
        url: '/pages/scenicSpot/index',
        },
        {
          id: 2,
          img: '/images/index/icon_hotel.png',
          name: '酒店',
          url: '/pages/hotel/choose',
        }
      ],
      [{
          id: 5,
          img: '/images/index/icon_food.png',
          name: '美食',
        url: '/pages/restaurant/search/search',
        },
        {
          id: 8,
          img: '/images/index/icon_parking.png',
          name: '停车',
          url: '/pages/parking/parkingRecord'
        }
      ],
    ],
  },


  cardTap: function(e) {
    console.log(e.currentTarget.dataset.url);
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})