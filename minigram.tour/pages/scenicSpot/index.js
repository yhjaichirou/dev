var bmap = require('../../libs/bmap/bmap-wx.min.js');
var config = require('../../config');
var api = require('../../utils/promise.js');
// var PageUtil = require('../../utils/PageUtil.js');
var app = getApp();

Page({
  data: {
    searchWords: '',
    placeholder: '输入城市或景点',

    address: "",

    arrays: [],

    limit: 10,
    currentPage: 0,

    pageUtil: null,

    latitude: "",
    longitude: ""
  },


  onLoad: function(options) {
    this.setData({
      address: options.address
    });
  },

  onShow: function() {

    this.GPSsubmit();

    var that = this;

    // pageUtil = new PageUtil(that, config.scenicListUrl, 10);
    // pageUtil.fetchMore(function (res) {
    //   console.log(res);
    // });

    this.fetchMore();
  },
  inputSearch: function(e) {
    this.setData({
      searchWords: e.detail.value,
      reList: true
    });
  },
  doSearch: function(e) {
    var that = this;
    // api.post(config.scenicListUrl, {
    //   limit: 10,
    //   page: 1,
    //   city: that.data.searchWords,
    // }).then(res => {
    //   that.setData({
    //     arrays: res.data
    //   });
    // });

    console.log("doSearch");

    this.fetchMore(function(res) {

    });

  },
  clearSearch: function() {
    this.setData({
      searchWords: ""
    });
  },

  /* 进入详细 */
  readDetail(e) {
    wx.navigateTo({
      url: './detail/detail?companyId=' + (e.currentTarget.dataset.companyid),
      success: function(res) {

      },
      fail: function(res) {

      },
      complete: function(res) {

      },
    });
  },


  onReachBottom() {
    console.log("onReachBottom");
    // 下拉触底，先判断是否有请求正在进行中
    // 以及检查当前请求页数是不是小于数据总页数，如符合条件，则发送请求
    this.fetchMore();
  },

  fetchMore(callback) {
    var that = this;
    var limit = that.data.limit;
    var page = that.data.currentPage + 1;
    var city = that.data.address;

    if (-1 == city.indexOf("市")) {
      city += "市";
    }

    var search = that.data.searchWords;

    if (this.data.reList) {
      page = 1;
      that.setData({
        currentPage: 1,
        arrays: [],
        reList: false
      });
    }

    console.log("limit: " + limit);
    console.log("page: " + page);
    console.log("搜索城市");
    console.log(city);
    console.log("搜索单词");
    console.log(search);


    api.post(config.scenicListUrl, {
      limit: limit,
      page: page,
      city: city,
      search: search
    }).then(res => {

      var arrays = res.data;
      if (arrays.length == 0) {
        return;
      }

      that.setData({
        currentPage: page
      });

      that.setData({
        arrays: that.data.arrays.concat(arrays)
      });
    })
  },

  GPSsubmit: function(e) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        that.setData({
          latitude: latitude,
          longitude: longitude
        });

        console.log(res);
      }
    })
  },


});