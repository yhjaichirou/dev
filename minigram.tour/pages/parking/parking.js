var bmap = require('../../libs/bmap/bmap-wx.min.js');

var config = require('../../config');

var api = require('../../utils/promise.js');

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    searchWords: '',
    placeholder: '搜索停车场',

    arrays: [],

    hasGPS: true,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {

    // var that = this;
    // var BMap = new bmap.BMapWX({
    //   ak: '826e806b86676d155282de3d37188137'
    // });
    // var fail = function(data) {
    //   console.log('fail!!!!')
    // };
    // var success = function(data) {
    //   console.log('success!!!');
    //   var weatherData = data.currentWeather[0];
    //   that.setData({
    //     address: weatherData.currentCity
    //   });
    // }
    // BMap.weather({
    //   fail: fail,
    //   success: success
    // });

    // api.post(config.scenicListUrl, {}).then(res => {
    //   that.setData({
    //     arrays: res.data
    //   });
    // });

    this.getLocation();
  },
  getLocation: function () {
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        var altitude = res.altitude
        var verticalAccuracy = res.verticalAccuracy
        var horizontalAccuracy = res.horizontalAccuracy
        _this.setData({
          latitude: latitude,
          longitude: longitude,
          hasGPS: true
        })
      },fail:function(){
        _this.setData({
          hasGPS:false
        });
      }
    })
  },

  onShow: function() {
    //this.setData({
    //	showResult: false
    //});
  },
  inputSearch: function(e) {
    this.setData({
      searchWords: e.detail.value
    });
  },
  doSearch: function() {
    this.setData({
      showResult: true
    });
  },

  clearSearch: function() {
    this.setData({
      searchWords: ""
    });
  },

  //点击列表项函数
  readDetail: function(e) {
    var index = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/parking/record/index',
    });
  },

  /* 预定按钮 */
  appointBtn: function(e) {
    var index = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: '/pages/parking/record/index',
    });
  },

  /* 查看停车记录 */
  searchRecord: function(e) {

  },

  /* 没开启GPS时的按钮组 */
  settingBtn: function (e) {

  },
  notcloseBtn: function(e) {

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