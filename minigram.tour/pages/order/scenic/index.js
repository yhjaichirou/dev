const config = require("../../../config.js");
const api = require("../../../utils/promise.js");
const jsonUtil = require("../../../utils/jsonUtil.js");
var app = getApp();


var scenicOrderData = require('../../../data/order/scenic.js');

import PageUtil from "../../../utils/PageUtil.js";

Page({
  data: {

    options: {},
    activeIndex: 1,
    menus: [{
        'menuId': 1,
        'menu': '全部'
      },
      {
        'menuId': 2,
        'menu': '待付款',
        'status': 10
      },
      {
        'menuId': 3,
        'menu': '已出票',
        'status': 20
      },
      {
        'menuId': 4,
        'menu': '已完成',
        'status': 30
      }
    ],

    pageUtil: null,
    orders: [],

    limit: 10,
    currentPage: 0,
  },

  onLoad: function(options) {
    this.setData({
      options: options
    });

    var pageUtil = new PageUtil(this, "orders", config.order.orderListUrl, 10);
    this.setData({
      pageUtil: pageUtil
    });
  },

  onShow: function() {
    // 页面显示
    var span = wx.getSystemInfoSync().windowWidth / this.data.menus.length + 'px';
    this.setData({
      itemWidth: this.data.menus.length <= 5 ? span : '160rpx'
    });
    this.fetchMore();
  },
  tabChange: function(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index,
      currentPage: 0,
      orders: [],
    });

    this.fetchMore(function(res) {
      console.log(res);
    });

  },


  //待付款 -> 去支付
  goPay(e) {
    var ordernum = e.currentTarget.dataset.ordernum;
    wx.navigateTo({
      url: '/pages/pay/pay?' + jsonUtil.json2Form({
        ordernum: ordernum
      }),
    });
  },
  //待付款 -> 取消
  goCancel(e) {
    var ordernum = e.currentTarget.dataset.ordernum;
    wx.navigateTo({
      url: '/pages/pay/pay?' + jsonUtil.json2Form({
        ordernum: ordernum
      }),
    });
  },
  //已出票 -> 使用
  goUse(e) {
    var ordernum = e.currentTarget.dataset.ordernum;
    wx.navigateTo({
      url: '/pages/qrcode/qrcode?' + jsonUtil.json2Form({
        ordernum: ordernum
      }),
    });
  },
  //已出票 -> 退款
  goReFund(e) {
    var ordernum = e.currentTarget.dataset.ordernum;
    wx.navigateTo({
      url: '/pages/qrcode/qrcode?' + jsonUtil.json2Form({
        ordernum: ordernum
      }),
    });
  },
  //已完成 -> 评论
  goComment(e) {
    var ordernum = e.currentTarget.dataset.ordernum;
    wx.navigateTo({
      url: '/pages/comment/comment?' + jsonUtil.json2Form({
        ordernum: ordernum
      }),
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
    var userId = app.globalData.userInfo.userId;
    var activeIndex = that.data.activeIndex;
    var status = "";

    if (activeIndex == 0) {
      status = "";
    } else if (activeIndex == 1) {
      status = 10;
    } else if (activeIndex == 2) {
      status = 20;
    } else if (activeIndex == 3) {
      status = 30;
    }

    if (!app.globalData.userInfo.userId) {
      wx.navigateTo({
        url: '/pages/authorize/authorize',
      });
      return;
    }

    console.log({
      pageSize: limit,
      pageNum: page - 1,
      userId: userId,
      activeIndex: activeIndex,
      status: status
    });

    api.get(config.order.orderListUrl + "?" + jsonUtil.json2Form({
      pageSize: limit,
      pageNum: page - 1,
      userId: userId,
      status: status
    })).then(res => {

      var orders = res.data.data.content;
      console.log(orders);

      //请求的数组长度为0，页数不增加
      if (orders.length == 0) {
        return;
      }

      that.setData({
        currentPage: page
      });

      that.setData({
        orders: that.data.orders.concat(orders)
      });
    })
  },




})