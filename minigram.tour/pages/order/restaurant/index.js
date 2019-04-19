const config = require("../../../config.js");
const api = require("../../../utils/promise.js");
var app = getApp();

var scenicOrderData = require('../../../data/order/scenic.js');


Page({
  data: {
    activeIndex: 1,
    menus: [{
        'menuId': 1,
        'menu': '全部'
      },
      {
        'menuId': 2,
        'menu': '待支付'
      },
      {
        'menuId': 3,
        'menu': '已出售'
      },
      {
        'menuId': 4,
        'menu': '已完成'
      }
    ]
  },

  onShow: function() {
    // 页面显示
    var span = wx.getSystemInfoSync().windowWidth / this.data.menus.length + 'px';
    this.setData({
      itemWidth: this.data.menus.length <= 5 ? span : '160rpx'
    });
  },
  tabChange: function(e) {

    var that = this;
    var index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    });

    that.setData({
      orders: scenicOrderData.scenicList
    })
  },


})