var dateutil = require('../../utils/dateutil.js');
var api = require('../../utils/promise.js');
var jsonUtil = require('../../utils/jsonUtil.js');

var app = getApp();
var oneDay = 1 * 24 * 60 * 60 * 1000;

Page({
  data: {

    /* 酒店入住开始时间 */
    HSdate: {
      date: '',
      week: '',
      startday: '',
      currentday: '',
    },
    /* 酒店入住结束时间 */
    HEdate: {
      date: '',
      week: '',
      startday: '',
      currentday: '',
    },
    FEdate: {
      date: '',
      week: '',
      startday: '',
      currentday: '',
    },

    hotelCity: '',

    searchWord: "",
  },

  onLoad: function(options) {},

  onShow: function() {
    this.setData({
      hotelCity: app.globalData.currentAddress
    });
    this.setData({
      HSdate: {
        date: dateutil.formatTime(new Date(Date.now() + oneDay)),
        week: dateutil.formatWeek(new Date(Date.now() + oneDay)),
        startday: dateutil.formatDay(new Date(Date.now() + oneDay)),
        currentday: dateutil.formatDay(new Date(Date.now() + oneDay))
      },
      HEdate: {
        date: dateutil.formatTime(new Date(Date.now() + oneDay)),
        week: dateutil.formatWeek(new Date(Date.now() + oneDay)),
        startday: dateutil.formatDay(new Date(Date.now() + oneDay)),
        currentday: dateutil.formatDay(new Date(Date.now() + oneDay))
      },
      FEdate: {
        date: dateutil.formatTime(new Date(Date.now() + oneDay)),
        week: dateutil.formatWeek(new Date(Date.now() + oneDay)),
        startday: dateutil.formatDay(new Date(Date.now() + oneDay)),
        currentday: dateutil.formatDay(new Date(Date.now() + oneDay))
      },
    })
    console.log(this.data.HSdate);
    console.log(this.data.HEdate);
    console.log(this.data.FEdate);
  },


  onReady: function() {
    // 页面渲染完成
  },

  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },

  /* 时间选择组件 */
  bingDateChange: function(e) { //绑定选择时间的函数
    var type = e.currentTarget.dataset.type;
    switch (type) {
      case '1':
        this.setData({
          HSdate: {
            date: dateutil.formatTime(new Date(e.detail.value)),
            week: dateutil.formatWeek(new Date(e.detail.value)),
            startday: this.data.HSdate.startday,
            currentday: dateutil.formatDay(new Date(e.detail.value))
          },
          HEdate: {
            date: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateutil.formatTime(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateutil.formatTime(new Date(this.data.FEdate.currentday)),
            week: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateutil.formatWeek(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateutil.formatWeek(new Date(this.data.FEdate.currentday)),
            startday: this.data.HEdate.startday,
            currentday: this.compareDay(e.detail.value, this.data.FEdate.currentday) === false ? dateutil.formatDay(new Date(new Date(e.detail.value).getTime() + oneDay)) : dateutil.formatDay(new Date(this.data.FEdate.currentday))
          }
        })
        break;
      case '2':
        this.setData({
          HEdate: {
            date: dateutil.formatTime(new Date(e.detail.value)),
            week: dateutil.formatWeek(new Date(e.detail.value)),
            startday: this.data.HEdate.startday,
            currentday: dateutil.formatDay(new Date(e.detail.value))
          }
        })
        break;
    }
  },

  myPosition: function(e) {
    wx.navigateTo({
      url: '/pages/searchBar/location/location',
    });
  },

  //日期比较
  compareDay: function(startday, endday) {
    var startSecond = new Date(startday).getTime();
    var endSecond = new Date(endday).getTime();
    if ((endSecond - startSecond) > oneDay) {
      return true;
    } else {
      return false;
    }
  },

  searchWordInput: function(e) {
    this.setData({
      searchWord: e.detail.value
    });
  },

  /* 开始搜索按钮 */
  searchBtn: function(e) {
    var that = this;

    console.log(that.data.hotelCity);
    console.log(that.data.HSdate.currentday);
    console.log(that.data.HEdate.currentday);
    console.log(that.data.searchWord);

    var formData = {
      city: that.data.hotelCity,
      startTime: that.data.HSdate.currentday,
      endTime: that.data.HEdate.currentday,
      searchWord: that.data.searchWord
    };
    wx.navigateTo({
      url: '/pages/hotel/index?' + jsonUtil.json2Form(formData),
    });
  }

})