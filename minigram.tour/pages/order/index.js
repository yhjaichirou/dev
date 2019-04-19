const config = require("../../config.js");
const api = require("../../utils/promise.js");
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    icons: [
      [{
          id: 1,
        img: '/images/order/icon_order_scenic.jpg',
          name: '景区',
          url: '/pages/order/scenic/index',
        },
        {
          id: 2,
          img: '/images/order/icon_order_hotel.jpg',
          name: '酒店',
          url: '/pages/order/hotel/index',
        },
        {
          id: 5,
          img: '/images/order/icon_order_food.jpg',
          name: '美食',
          url: '/pages/order/restaurant/index',
        },
        {
          id: 8,
          img: '/images/order/icon_order_parking.jpg',
          name: '停车',
          url: '/pages/order/parking/index',
        }
      ]
    ],
  },


  /**
   * 跳转列表
   */
  cardTap: function(e) {
    console.log(e.currentTarget.dataset.url);
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
    // wx.navigateTo({
    //   url: '/pages/order/list/index'
    // });
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