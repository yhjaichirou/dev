var bmap = require('../../../libs/bmap/bmap-wx.min.js');

var config = require('../../../config');
var api = require('../../../utils/promise.js');
var app = getApp();


Page({
  data: {
    searchWords: '',
    placeholder: '输餐厅或菜品',

    arrays: [],
  },


  onLoad: function() {

    var that = this;
    var BMap = new bmap.BMapWX({
      ak: '826e806b86676d155282de3d37188137'
    });
    var fail = function(data) {
      console.log('fail!!!!')
    };
    var success = function(data) {
      console.log('success!!!');
      var weatherData = data.currentWeather[0];
      that.setData({
        address: weatherData.currentCity
      });
    }
    BMap.weather({
      fail: fail,
      success: success
    });

    api.post(config.restaurant.getAllRestaurantUrl, {
      pageSize:10,
      pageNum:1,
    }).then(res => {
      console.log(res.data);
      that.setData({
        arrays: res.data.content
      });
    })
  },

  inputSearch: function(e) {
    this.setData({
      searchWords: e.detail.value
    });
  },

  xscrollItemTap:function(e){
    wx.navigateTo({
      url: '',
    });
  },

  readDetail:function(e){
    wx.navigateTo({
      url: '/pages/restaurant/detail/detail',
    });
  },

});